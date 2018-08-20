/*  eslint-disable no-unused-vars*/

import React from "react";
import {Link} from "react-router-dom";

const paperTypes={
    filled:0,
    empty:1
}
// let Papers={};
let start = null;
let movementStart=null;
let stopAnimation=false;
let emptyPaperTemplate=null;
let filledPaperTemplate=null;
let platform=null;
let lightning=null;

class Landing extends React.Component{
    
    constructor(){
        super();

        this.state={
            startPointX:551,
            startPointY:238,
            outPointX:860,
            outPointY:436,
            Papers:{},
            emptyPaperTemplate:null,
            filledPaperTemplate:null
        }

        this.paperFactory=this.paperFactory.bind(this);
        this.handleVisibilityChange=this.handleVisibilityChange.bind(this);
        this.step=this.step.bind(this);
    }



    componentDidMount(){
        emptyPaperTemplate=document.getElementById("kagit-bos-1");
        filledPaperTemplate=document.getElementById("kagit-dolu-1");
        platform = document.getElementById("carpet");
        lightning = document.getElementById("simsek3");
        window.requestAnimationFrame(this.step);
        window.onresize=this.ResetFactory;
        document.addEventListener("visibilitychange",this.handleVisibilityChange);   
        this.paperFactory();
    }

    componentWillUnmount(){
        window.onresize=null;
        stopAnimation=true;
        document.removeEventListener("visibilityChange",this.handleVisibilityChange,true);
    }

    handleVisibilityChange(){
        if (document.hidden){
            this.ResetFactory();
        } 
    }

    step(timestamp) {
        if(!stopAnimation){
            if (!start) start = timestamp;
            if (!movementStart) movementStart = timestamp;
            let progress = timestamp - start;
            let movementProgress = timestamp - movementStart;
        
            if(movementProgress>=30)
            {
                this.movePapers();
                movementStart=timestamp;
            }
        
            if(progress>=3200)
            {
                this.paperFactory();
                start=timestamp;
            }
        
            window.requestAnimationFrame(this.step);
        }
    }

    paperFactory()
    {
        let id=`paper-`+this.uuidv4();
        let Papers=this.state.Papers;

        Papers["empty-paper-"+id]=
            {
                element:emptyPaperTemplate.cloneNode(true),
                x:this.state.startPointX,//default coord
                y:this.state.startPointY ,
                type:paperTypes.empty
            };
        
        Papers["empty-paper-"+id].element.id=`empty-paper-${id}`;
        Papers["empty-paper-"+id].element.style.display=`block`;
        
        this.setTranslate(Papers["empty-paper-"+id]);
        platform.parentNode.insertBefore(Papers["empty-paper-"+id].element,platform.nextSibling);
        
        Papers["filled-paper-"+id]=
            {
                element:filledPaperTemplate.cloneNode(true),
                x:this.state.outPointX,//default coord
                y:this.state.outPointY,
                type:paperTypes.filled
            };
        
        Papers["filled-paper-"+id].element.id=`filled-paper-${id}`;
        Papers["filled-paper-"+id].element.style.display=`block`;
        this.setTranslate(Papers["filled-paper-"+id]);
        lightning.parentNode.insertBefore(Papers["filled-paper-"+id].element,lightning.nextSibling);

        this.setState({Papers});
    }
    
    movePapers(paper)
    {
        let Papers=this.state.Papers;
        Object.keys(Papers).forEach(key=>
        {
            let paperEle=Papers[key];
            paperEle.x+=2;
            paperEle.y+=1.20;
            this.setTranslate(paperEle);
    
            //kağıt dışarı çıktıysa sil ki yer kaplamasın
            if(paperEle.type===paperTypes.filled)
            {
                if(!this.isInViewport(paperEle.element))
                {
                    paperEle.element.remove();
                    delete Papers[key];
                }
            }
            else{
                paperEle.element.classList.add("appear");
                if(paperEle.y>400)
                {
                    paperEle.element.remove();
                    delete Papers[key];
                }
            }
        });
        this.setState({Papers});
    }
    
    setTranslate(paper)
    {
        paper.element.style.transform=`translate(${paper.x}px, ${paper.y}px)`;
    }
    
    isInViewport(elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left - 60 >= 0 &&
            bounding.bottom - 60 <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right - 60<= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    ResetFactory()
    {
        if(this.state)
        {
            let Papers=this.state.Papers;
            Object.keys(Papers).forEach(key=>{
                Papers[key].element.remove();
            });
            Papers={};
            this.setState({Papers});
        }
    }
    
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    render(){
        return (
            <main>
            <section id="hero">
                <div className="hero__wrapper">
                    <h2 className="hero__brand">Memorizer</h2>
                    <h1 className="hero__main-header">Study.<br/>Like a game.</h1>
                    <p>Memorizer is a web app created to help how you study. You can create your own question lists with your own answers and choose how you want to learn them.</p>
                    <Link to="/memorizer" className="hero__btn-start">Start now</Link>
                    
                </div>
        
                <div className="hero__canvas">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1640 1251" preserveAspectRatio="xMidYMid meet">
                        <defs>
                            <linearGradient id="a" x1="100%" x2="-8.891%" y1="50%" y2="40.121%">
                            <stop offset="0%" stopColor="#FFEC49"/>
                            <stop offset="35.925%" stopColor="#FFDD3A"/>
                            <stop offset="42.882%" stopColor="#FFE33A"/>
                            <stop offset="100%" stopColor="#FED523"/>
                            </linearGradient>
                            <filter id="b" width="311.7%" height="241.5%" x="-105.9%" y="-70.8%" filterUnits="objectBoundingBox">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                            </filter>
                            <linearGradient id="c" x1="89.664%" x2="-13.835%" y1="23.26%" y2="29.268%">
                            <stop offset="0%" stopColor="#FFEC49"/>
                            <stop offset="35.925%" stopColor="#FFDD3A"/>
                            <stop offset="42.882%" stopColor="#FFE33A"/>
                            <stop offset="100%" stopColor="#FED523"/>
                            </linearGradient>
                            <filter id="d" width="380.3%" height="279.7%" x="-140.1%" y="-89.9%" filterUnits="objectBoundingBox">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                            </filter>
                            <linearGradient id="e" x1="100%" x2="0%" y1="50%" y2="50%">
                            <stop offset="0%" stopColor="#FFEC4C"/>
                            <stop offset="100%" stopColor="#FED525"/>
                            </linearGradient>
                            <filter id="f" width="652.1%" height="235.6%" x="-276.1%" y="-67.8%" filterUnits="objectBoundingBox">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                            </filter>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                            <image id="carpet" width="1640" height="1209" xlinkHref="./img/hali.png"/>
                            <image id="kagit-dolu-1" style={{display:"none"}} width="125" height="75" xlinkHref="./img/kagıt_dolu1.png"/>
                            <image id="kagit-bos-1"  className="empty-paper" style={{display:"none"}} width="125" height="75" xlinkHref="./img/kagıt_bos1.png"/>
                            <image id="platform" width="1640" height="1251" xlinkHref="./img/platform.png"/>
                            <g id="simsek1">
                                <path fill="#F5C501" d="M3.366 45.585L7.34 42.85a2 2 0 0 0 .667-.778l2.95-6.11-5.586-4.235-4.515 11.89a1.671 1.671 0 0 0 2.51 1.97z"/>
                                <path fill="url(#a)" d="M21.222 8.234l7.318-3.245-7.23 30.266a2 2 0 0 1-1.17 1.38l-4.006 1.683a2 2 0 0 1-1.32.08l-.002.004-.03-.013a1.998 1.998 0 0 1-.417-.179l-8.111-3.48-1.782 9.514a2 2 0 0 1-3.965-.342L.204 20.84a2 2 0 0 1 3.381-1.473l4.988 4.764 5.118-19.163a2 2 0 0 1 2.867-1.253l5.03 2.66-.366 1.859z"/>
                                <path fill="url(#a)" d="M21.222 8.234l7.318-3.245-7.23 30.266a2 2 0 0 1-1.17 1.38l-4.006 1.683a2 2 0 0 1-1.32.08l-.002.004-.03-.013a1.998 1.998 0 0 1-.417-.179l-8.111-3.48-1.782 9.514a2 2 0 0 1-3.965-.342L.204 20.84a2 2 0 0 1 3.381-1.473l4.988 4.764 5.118-19.163a2 2 0 0 1 2.867-1.253l5.03 2.66-.366 1.859z" filter="url(#b)"/>
                                <path fill="#FFE46E" d="M1.555 18.776l6.065-2.483a2 2 0 0 1 2.059.332l1.14.977-1.776 8.625-.188 1.268-7.667-5.214a2 2 0 0 1 .367-3.505z"/>
                                <path fill="#FFEC9B" d="M14.859 3.507l5.26-2.96a2 2 0 0 1 1.949-.006l5.372 2.974a2 2 0 0 1 .019 3.489l-5.303 3.01a2 2 0 0 1-1.975 0L14.852 6.99a2 2 0 0 1 .007-3.482z"/>
                            </g>
                            <g id="simsek3">
                                <path fill="#FFEC9B" d="M13.724 17.55L6.364 14l-5.32 3.264a2 2 0 0 0 1.488 3.655l3.833-.87 7.359-2.498z"/>
                                <path fill="url(#c)" d="M12.415 17.028l-5.997-2.956-2.712-7.604a2 2 0 0 1 3.044-2.3l2.41 1.716.006.016 6.118-3.507a2 2 0 0 1 2.959 1.357l3.272 16.997a2 2 0 0 1-2.076 2.375l-2.73-.152a2 2 0 0 0-2.064 2.428l2.02 9.157a.673.673 0 0 1-.735.813c-.303.172-.682.2-1.023.045l-2.01-.918a2 2 0 0 1-.685-.514L.628 20.53a2 2 0 0 1 2.13-3.21l3.986 1.288 1.386.495 4.369-1.792-.084-.284z"/>
                                <path fill="url(#c)" d="M12.415 17.028l-5.997-2.956-2.712-7.604a2 2 0 0 1 3.044-2.3l2.41 1.716.006.016 6.118-3.507a2 2 0 0 1 2.959 1.357l3.272 16.997a2 2 0 0 1-2.076 2.375l-2.73-.152a2 2 0 0 0-2.064 2.428l2.02 9.157a.673.673 0 0 1-.735.813c-.303.172-.682.2-1.023.045l-2.01-.918a2 2 0 0 1-.685-.514L.628 20.53a2 2 0 0 1 2.13-3.21l3.986 1.288 1.386.495 4.369-1.792-.084-.284z" filter="url(#d)"/>
                                <path fill="#FFEC9B" d="M16.909 1.859L12.937.205a2 2 0 0 0-1.747.102L4.742 3.922a2 2 0 0 0 .841 3.74l6.455.443 5.028-2.628a2 2 0 0 0-.157-3.618z"/>
                            </g>
                            <image id="beyin" width="250" height="150" xlinkHref="./img/beyin.png"/>
                            <g id="simsek2">
                                <path fill="#FFE36E" d="M.354 4.643l-.186-.437A1 1 0 0 1 .536 2.98l2.788-1.847a1 1 0 0 1 1.06-.028L7.4 2.884a1 1 0 0 1 .114 1.644L4.486 6.934l-2.37-.712A2.786 2.786 0 0 1 .354 4.643z"/>
                                <path fill="url(#e)" d="M3.907 4.428l.014-.01 2.455-1.493a1 1 0 0 1 1.52.854v13.683l3.04-1.922-1.017 29.698-3.451 1.615-.103-2.702v2.873L3.914 25.705l-2.9 3.869L.07 3.878a1 1 0 0 1 1.527-.886l2.31 1.436z"/>
                                <path fill="url(#e)" d="M3.907 4.428l.014-.01 2.455-1.493a1 1 0 0 1 1.52.854v13.683l3.04-1.922-1.017 29.698-3.451 1.615-.103-2.702v2.873L3.914 25.705l-2.9 3.869L.07 3.878a1 1 0 0 1 1.527-.886l2.31 1.436z" filter="url(#f)"/>
                            </g>
                            <image id="platform-maske" width="1640" height="1251" xlinkHref="./img/pmaske.png"/>
                        </g>
                    </svg>
                </div>
            </section>
            <section className="how-to">
            </section>
        </main>
        );
    }
}

export default Landing