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

        let bank = this.add.text(this.cameras.main.centerX, 100, "🏦 Bank")
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
                    this.showMessage("Thank you my dear customer!");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Economy").setFontSize(80);
        this.add.text(50,150, "Click the emoji below to start.").setFontSize(36);
        const moneyEmoji = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "🤑").setFontSize(512).setOrigin(0.5).setInteractive();
        moneyEmoji.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(80);
        this.add.text(50, 150, "Click the emoji again to restart").setFontSize(36);
        const moneyEmoji = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "💸").setFontSize(512).setOrigin(0.5).setInteractive();
        moneyEmoji.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
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
    scene: [Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

