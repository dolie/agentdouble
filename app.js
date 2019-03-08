import { defaultPlaces } from './places.js';

var app = new Vue({
    el: '#app',
    data(){
        return {
            playerMessage : '',
            players       : 3,
            status        : 'home',
            waitingPlayer : 1,
            timer         : 0,
            timerEnd      : 0,
            doubleAgent   : 0,
            defaultPlaces,
            places        : [],
            place         : '',
            audio         : new Audio('alert.mp3')
        }
    },
    computed:{
        minutes(){
            return Math.floor(this.timer / (60 *1000));
        },
        seconds(){
            let seconds = Math.floor(this.timer/1000)
            return seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
        },
        alert(){
            return this.minutes <= 0 && this.status === 'started';
        },
        showGo(){
            return this.minutes >= 7 && this.seconds > 50;
        }
    },
    watch : {
        status : function(newVal) {
            newVal !== 'end' || this.audio.play();
        }
    },
    methods : {
        start(){
            this.choosePlace();
            this.status = 'iddle';
            this.determiningAgent(this.players);
        },
        //iddle waiting for click -> ready
        ready(){
            if ( this.doubleAgent === this.waitingPlayer){
                this.playerMessage = 'Tu es l\'agent double !';
            }else{
                this.playerMessage = this.place;
            }
            this.status = 'ready';
        },
        //ready waiting for click -> GO
        GO(){
            if ( this.waitingPlayer == this.players ){
                this.status = 'started';
                this.setTimer();
                this.verifyTime();
            }else{
                this.waitingPlayer++;
                this.status = 'iddle';
            }
        },

        restart(){
            this.waitingPlayer = 1;
            this.doubleAgentfound = false;
            this.start();
        },
        setTimer(){
            this.timerEnd = Date.now() + 8 * 60 * 1000;
        },
        verifyTime(){
            this.timer = this.timerEnd - Date.now();
            this.timer >= 0 ? setTimeout(this.verifyTime , 1000) : this.status = 'end';
        },
        determiningAgent(nbPlayers) {
            this.doubleAgent = Math.ceil(Math.random() * Math.floor(nbPlayers));
        },
        choosePlace(){
            if (this.places.length <= 0){
                this.places.push( ...this.defaultPlaces );
            }
            let magic = Math.floor(Math.random() * Math.floor(this.places.length));
            this.place = this.places[magic];
            this.places.splice(magic, 1);
        },
    }
})
