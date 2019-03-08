import { defaultPlaces } from './places.js';

var app = new Vue({
    el: '#app',
    data(){
        return {
            playerMessage: '',
            players: 3,
            status: 'home',
            waitingPlayer: 1,
            timerDefault: 480,
            timer: 0,
            doubleAgent: 0,
            defaultPlaces,
            places : [],
            place : '',
        }
    },
    computed:{
        minutes(){
            return Math.floor(this.timer / 60);
        },
        seconds(){
            return this.timer % 60 < 10 ? `0${this.timer % 60}` : this.timer % 60;
        },
        alert(){
            return this.minutes <= 0 && this.status === 'started';
        },
        showGo(){
            return this.minutes >= 7 ;
        }
    },
    created(){
        this.timer = this.timerDefault;
    },
    methods:{
        start(){
            this.choosePlace();
            this.status = 'iddle';
            this.determiningAgent(this.players);
        },
        ready(){
            if ( this.doubleAgent === this.waitingPlayer){
                this.playerMessage = 'Tu es l\'agent double !';
            }else{
                this.playerMessage = this.place;
            }
            this.status = 'ready';
        },
        GO(){
            if ( this.waitingPlayer === this.players ){
                this.status = 'started';
                this.verifyTime();
            }else{
                this.waitingPlayer++;
                this.status = 'iddle';
            }
        },
        restart(){
            this.waitingPlayer = 1;
            this.doubleAgentfound = false;
            this.timer = this.timerDefault;
            this.start();
        },
        count(){
            this.timer--;
            this.verifyTime();
        },
        verifyTime(){
            if (this.timer >= 0){
                setTimeout(this.count,1000);
            }else{
                this.status = 'end';
            }
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