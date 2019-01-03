/*  eslint-disable no-unused-vars*/
import React from 'react';
import {TextField,Select,Button,Fab,GridList,GridListTile,GridTilePrimary,GridTilePrimaryContent,GridListTileBar,GridTileTitle} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';

import atomIMG from '../images/atom.png';
import piIMG from '../images/pi.png';
import dnaIMG from '../images/dna.png';
import rocketIMG from '../images/rocket.png';
import angularIMG from '../images/angular.png';
import language from '../data/Language';
import images from '../data/images';

class YourSpace extends React.Component{
    constructor(){
        super();

        this.state={
            addWorkSet:false,
            filter:false
        }

        this.showAddWorkSet=this.showAddWorkSet.bind(this);
        this.renderWorkSetList=this.renderWorkSetList.bind(this);
        this.addWorkSet=this.addWorkSet.bind(this);
        this.readFile=this.readFile.bind(this);
        this.removeWorkSet=this.removeWorkSet.bind(this);
    }

    showAddWorkSet(){
        this.setState({
                addWorkSet:!this.state.addWorkSet,
                filter:!this.state.addWorkSet?false:this.state.filter
            });
    }

    addWorkSet(e){
        e.preventDefault();

        let workSet={
            name:this.addWorkSetInput.value,
            description:this.addDescriptionInput.value,
            imageURL:this.addImageInput.value
        }
        this.addWorkSetInput.value="";
        this.addDescriptionInput.value="";
        this.addImageInput.value="";
        this.addWorkSetInput.focus();
        console.log(workSet)
        this.props.addWorkSet(workSet);
    }

    removeWorkSet(e,key){
        e.stopPropagation();
        let workSets=this.props.workSets;
        delete workSets[key];
        this.props.removeWorkSet(workSets);
    }

    upload()
    {
        this.fileInput.click();
    }

    readFile()
    {  
        if(this.fileInput.files[0]!== undefined && this.fileInput.files[0])
        {
            const _this=this;
            console.log(this.fileInput.files)
            Object.keys(this.fileInput.files).map((key)=>{
                var fr = new FileReader();
                fr.onload = function(e) {
                    // e.target.result should contain the text
                    let words=JSON.parse(e.target.result);
                    _this.props.addFromFile(words);
                };
                fr.readAsText(this.fileInput.files[key]);
                return true;
            });
        }
    }

    getWords()
    {
        let code=`
        let json={}

        let href=window.location.href.split("/");
        href.pop();
        let part2=href.pop();
        let part1=href.pop();
        
        json.words={};
        json.workSet=part1+" "+part2;
        
        $(".thing").each(function(){
            let word=clean($(this).find(".col_a div")[0].innerText);
            let translation=clean($(this).find(".col_b div")[0].innerText);
            json.words[word]={
                language:"en-US",
                translationLanguage:"es-ES",
                translation:translation,
            }
        })
        
        
        
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
        g=document.createElement('a')
        g.setAttribute("href",     dataStr     );
        g.setAttribute("download", "scene.json");
        g.click();
        
        
        function clean(word)
        {
            return word.replace("í","i").replace("¿","").replace("?","").replace("!","").replace("¡","").replace("ó","o").replace("á","a").replace(" ...","").replace(",","").replace(";","").replace("?","").replace("ñ","n").replace("ú","u")
        }
        `;
    }

    renderAddWorkSetForm(){
        const siteLang=this.props.settings.siteLanguage;
        return (
            <form action="#">
                <TextField inputRef={input => this.addWorkSetInput=input}  label={language.workSet[siteLang].txt_add_word} />
                <TextField inputRef={input => this.addDescriptionInput=input} label={language.workSet[siteLang].txt_add_meaning} />
                <TextField inputRef={input => this.addImageInput=input} label={language.workSet[siteLang].txt_add_image} />
                <Button raised onClick={e=>this.addWorkSet(e)}>{language.workSet[siteLang].btn_add}</Button>
            </form>
        )
    }

    renderWorkSetList(workSetKeys){
        workSetKeys=workSetKeys.sort();
        return(
            <GridList>
                {
                    workSetKeys.map((key, i) => 
                    {
                        let workSet=this.state.workSets[key];
                        return (
                            <GridListTile key={i} onClick={()=>this.props.showManageWordsDiscover(key)}>
                                <img src={workSet.imageURL} alt={workSet.name} />
                                <GridListTileBar 
                                    title={workSet.name}
                                         actionIcon={
                                        <IconButton>
                                        </IconButton>
                                    }
                                />
                                    {/* <img className="source-language" alt="" src={images.flags[workSet.questionLanguage]}/>
                                    <img className="target-language" alt="" src={images.flags[workSet.answerLanguage]}/>
                                    <div className="description">{workSet.description}</div> */}

                                {/* <div className="created-by">
                                    <img src={workSet.creatorPhotoURL} alt=""/>
                                    <span>Keremcan Çakar</span>
                                </div> */}
                            </GridListTile>
                    )}
                )}
            </GridList>
        )
    }

    renderNewStart(){
        const siteLang=this.props.settings.siteLanguage;
        return (
                <div className="new">
                    <div className="topline"></div>
                    <div  className="images">
                        <img src={rocketIMG}   alt="" />
                        <img src={atomIMG} alt="" />
                        <img src={piIMG}   alt="" />
                        <img src={dnaIMG}  alt="" />
                        <img src={angularIMG}  alt="" />
                    </div>
                    <span>{language.workSet[siteLang].txt_new_start}</span>
                </div>
        )
    }
    
    render(){
       const workSetKeys=Object.keys(this.props.workSets);
       return(
            <section className="your-space category">
                <input multiple ref={input=>this.fileInput=input} onChange={this.readFile} type="file" accept=".json"/>
                <Fab mini onClick={()=>this.upload()}>backup</Fab>
                <Fab mini onClick={this.showAddWorkSet}>add</Fab>
                <div className={this.state.addWorkSet?"addWorkSet visible":"addWorkSet"}>
                    {this.renderAddWorkSetForm()}
                </div>
                <div className="your-space__info">
                    <h2>This is your space {this.props.user.userName}! <br/>You can import words from your kindle, manage worksets and study.</h2>
                </div>
                {workSetKeys.length > 0 ? this.renderWorkSetList(workSetKeys) : this.renderNewStart()}
            </section>
       );
    }
}

export default YourSpace;