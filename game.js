class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Economy").setFontSize(80);
        this.add.text(50,150, "Click the emoji below to start.").setFontSize(36);
        const moneyEmoji = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "💸").setFontSize(512).setOrigin(0.5).setInteractive();
        moneyEmoji.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let dollar = this.add.text(200, 400, "💵")
            .setFontSize(128)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It's the American dollar!")
            })
            .on('pointerdown', () => {
                this.showMessage("You picked up the dollar.");
                this.gainItem('dollar');
                this.tweens.add({
                    targets: dollar,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => dollar.destroy()
                });
            })

        let euro = this.add.text(500, 900, "💶")
            .setFontSize(128)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It's the European euro!")
            })
            .on('pointerdown', () => {
                this.showMessage("You picked up the euro.");
                this.gainItem('euro');
                this.tweens.add({
                    targets: euro,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => euro.destroy()
                });
            })

        let pound = this.add.text(1100, 500, "💷")
            .setFontSize(128)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It's the British pound!")
            })
            .on('pointerdown', () => {
                this.showMessage("You picked up the pound.");
                this.gainItem('pound');
                this.tweens.add({
                    targets: pound,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => pound.destroy()
                });
            })

        let bank = this.add.text(this.cameras.main.centerX-240, 100, "🏦 Bank")
            .setFontSize(128)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                if (this.hasItem("dollar") && this.hasItem("euro") && this.hasItem("pound")) {
                    this.showMessage("You are rich enough to go inside the bank!");
                } else {
                    this.showMessage("You are too poor to enter. Collect more money $o$!!");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("dollar") && this.hasItem("euro") && this.hasItem("pound")) {
                    this.loseItem("dollar");
                    this.loseItem("euro");
                    this.loseItem("pound");
                    this.showMessage("Thank you my dear customer, welcome in!");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "My boy you are inside the bank.");
    }
    onEnter() {

        let ATM = this.add.text(this.cameras.main.centerX-240, this.cameras.main.centerY, "🏧\nATM")
            .setFontSize(192)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It is a pretty cool looking ATM.");
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("ATM opened. Let's go inside the ATM!");
                    this.gotoScene('demo3');
                }
            })

        let key = this.add.text(1400, 1000, "🔑")
            .setFontSize(64)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It's a golden key! I wonder what it is for.")
            })
            .on('pointerdown', () => {
                this.showMessage("You picked up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })
    }
}

class Demo3 extends AdventureScene {
    constructor() {
        super("demo3", "My boy you are inside the ATM machine!");
    }
    onEnter() {

        let door = this.add.text(1350, 150, "🚪")
            .setFontSize(128)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("You can exit the ATM through this door.");
            })
            .on('pointerdown', () => {
                let items = ["money0", "money1", "money2", "money3", "money4", "money5", "money6", "money7", "money8", "money9", "moneya", "moneyb", "moneyc", "moneyd", "moneye", "moneyf", "gem1", "gem2", "gem3", "card"];
                let allItemsPresent = true;
                for (let i = 0; i < items.length; i++) {
                    if (!this.hasItem(items[i])) {
                        allItemsPresent = false;
                        break;
                    }
                }
                if (allItemsPresent) {
                    for (let i = 0; i < items.length; i++) {
                        this.loseItem(items[i]);
                    }
                    this.showMessage("*cracks*");
                    this.gotoScene('demo4');
                }
                else {
                    this.showMessage("I should explore this place more...");
                }
            })

        let box = this.add.text(this.cameras.main.centerX-240, this.cameras.main.centerY, "📦")
            .setFontSize(192)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It is a big box. Wonder what is in there.");
            })
            .on('pointerdown', () => {
                if (this.hasItem("hammer")) {
                    this.loseItem("hammer");
                    this.showMessage("*explodes*");
                    this.tweens.add({
                        targets: box,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => {
                            box.destroy()
                            
                            let money0 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money0');
                                this.tweens.add({
                                    targets: money0,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money0.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money0,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money1 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money1');
                                this.tweens.add({
                                    targets: money1,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money1.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money1,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money2 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money2');
                                this.tweens.add({
                                    targets: money2,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money2.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money2,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money3 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money3');
                                this.tweens.add({
                                    targets: money3,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money3.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money3,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money4 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money4');
                                this.tweens.add({
                                    targets: money4,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money4.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money4,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money5 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money5');
                                this.tweens.add({
                                    targets: money5,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money5.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money5,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money6 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money6');
                                this.tweens.add({
                                    targets: money6,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money6.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money6,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money7 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money7');
                                this.tweens.add({
                                    targets: money7,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money7.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money7,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money8 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money8');
                                this.tweens.add({
                                    targets: money8,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money8.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money8,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let money9 = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('money9');
                                this.tweens.add({
                                    targets: money9,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => money9.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: money9,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let moneya = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('moneya');
                                this.tweens.add({
                                    targets: moneya,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => moneya.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: moneya,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let moneyb = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('moneyb');
                                this.tweens.add({
                                    targets: moneyb,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => moneyb.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: moneyb,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let moneyc = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('moneyc');
                                this.tweens.add({
                                    targets: moneyc,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => moneyc.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: moneyc,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let moneyd = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('moneyd');
                                this.tweens.add({
                                    targets: moneyd,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => moneyd.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: moneyd,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let moneye = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('moneye');
                                this.tweens.add({
                                    targets: moneye,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => moneye.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: moneye,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let moneyf = this.add.text(box.x, box.y, "💵")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the money.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the money.");
                                this.gainItem('moneyf');
                                this.tweens.add({
                                    targets: moneyf,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => moneyf.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: moneyf,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let gem1 = this.add.text(box.x, box.y, "💎")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the gem.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the gem.");
                                this.gainItem('gem1');
                                this.tweens.add({
                                    targets: gem1,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => gem1.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: gem1,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let gem2 = this.add.text(box.x, box.y, "💎")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the gem.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the gem.");
                                this.gainItem('gem2');
                                this.tweens.add({
                                    targets: gem2,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => gem2.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: gem2,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let gem3 = this.add.text(box.x, box.y, "💎")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the gem.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the gem.");
                                this.gainItem('gem3');
                                this.tweens.add({
                                    targets: gem3,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => gem3.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: gem3,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                            let card = this.add.text(box.x, box.y, "💳")
                                .setFontSize(96)
                                .setInteractive()
                                .setOrigin(0.5)
                                .on('pointerover', () => {
                                    this.showMessage("It's just the debit card.")
                                })
                                .on('pointerdown', () => {
                                this.showMessage("You picked up the card.");
                                this.gainItem('card');
                                this.tweens.add({
                                    targets: card,
                                    y: `-=${2 * this.s}`,
                                    alpha: { from: 1, to: 0 },
                                    duration: 500,
                                    onComplete: () => card.destroy()
                                });
                            })
                            this.tweens.add({
                                targets: card,
                                x: Phaser.Math.Between(200, 1240),
                                y: Phaser.Math.Between(200, 880),
                                duration: 200
                            });

                        }
                    });
                }
            })

        let hammer = this.add.text(100, 100, "🔨")
            .setFontSize(64)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("This hammer is heavy as what Thor carries around!")
            })
            .on('pointerdown', () => {
                this.showMessage("You picked up the hammer.");
                this.gainItem('hammer');
                this.tweens.add({
                    targets: hammer,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => hammer.destroy()
                });
            })
    }
}

class Demo4 extends AdventureScene {
    constructor() {
        super("demo4", "Now I am rich, let's go outside the bank!");
    }
    onEnter() {

        let door = this.add.text(this.cameras.main.centerX-240, this.cameras.main.centerY, "🚪")
            .setFontSize(192)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => {
                this.showMessage("Adios, bank!");
                this.gotoScene('demo5');
            })
    }
}

class Demo5 extends AdventureScene {
    constructor() {
        super("demo5", "Let's buy a car to go somewhere else!");
    }
    onEnter() {

        let policecar = this.add.text(360, this.cameras.main.centerY, "🚓")
            .setFontSize(384)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It is a pretty cool looking police car.");
            })
            .on('pointerdown', () => {
                this.showMessage("*Siren sound bursts*");
                this.gotoScene('badending');
            })

        let bugatti = this.add.text(1080, this.cameras.main.centerY, "🏎️")
            .setFontSize(384)
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerover', () => {
                this.showMessage("It is a pretty cool looking super car.");
            })
            .on('pointerdown', () => {
                this.showMessage("What color is your Bugatti?");
                this.gotoScene('goodending');
            })
    }
}

class Badending extends Phaser.Scene {
    constructor() {
        super('badending');
    }
    create() {
        this.add.text(50, 50, "Oh no! You were caught by the police!").setFontSize(80);
        this.add.text(50, 150, "Click the emoji again to restart").setFontSize(36);
        const moneyEmoji = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "👮").setFontSize(512).setOrigin(0.5).setInteractive();
        moneyEmoji.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}

class Goodending extends Phaser.Scene {
    constructor() {
        super('goodending');
    }
    create() {
        this.add.text(50, 50, "Congratulations, you are rich now!").setFontSize(80);
        this.add.text(50, 150, "Click the emoji again to restart").setFontSize(36);
        const moneyEmoji = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "🤑").setFontSize(512).setOrigin(0.5).setInteractive();
        moneyEmoji.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Demo3, Demo4, Demo5, Badending, Goodending],
    title: "Adventure Game",
});

