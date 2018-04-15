/*  eslint-disable no-unused-vars*/
import React from 'react';
import {render} from 'react-dom';
import {Elevation,TextField,Button,Fab,GridList,GridTile,GridTilePrimary,GridTilePrimaryContent,GridTileSecondary,GridTileTitle} from 'rmwc';
import atomIMG from '../images/atom.png';
import piIMG from '../images/pi.png';
import dnaIMG from '../images/dna.png';
import rocketIMG from '../images/rocket.png';
import angularIMG from '../images/angular.png';
import language from '../Language';

class Category extends React.Component{
    constructor(){
        super();

        this.state={
            addCategory:false
        }

        this.showAddCategory=this.showAddCategory.bind(this);
        this.renderCategoryList=this.renderCategoryList.bind(this);
        this.addCategory=this.addCategory.bind(this);
        this.readFile=this.readFile.bind(this);
        this.removeCategory=this.removeCategory.bind(this);

    }
    showAddCategory(){
        this.setState({addCategory:!this.state.addCategory});
    }

    addCategory(e){
        e.preventDefault();

        let category={
            name:this.addCategoryInput.value,
            description:this.addDescriptionInput.value,
            imageURL:this.addImageInput.value
        }
        this.addCategoryInput.value="";
        this.addDescriptionInput.value="";
        this.addImageInput.value="";
        this.addCategoryInput.focus();
        console.log(category)
        this.props.addCategory(category);
    }

    removeCategory(e,key){
        e.stopPropagation();
        let categories=this.props.categories;
        delete categories[key];
        this.props.removeCategory(categories);
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
        json.category=part1+" "+part2;
        
        $(".thing").each(function(){
            let word=clean($(this).find(".col_a div")[0].innerText);
            let translation=clean($(this).find(".col_b div")[0].innerText);
            json.words[word]={
                language:"İngilizce",
                translationLanguage:"İspanyolca",
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

    renderAddCategoryForm(){
        const siteLang=this.props.settings.siteLanguage;
        return (
            <form action="#">
                <TextField inputRef={input => this.addCategoryInput=input}  label={language.category[siteLang].txt_add_word} />
                <TextField inputRef={input => this.addDescriptionInput=input} label={language.category[siteLang].txt_add_meaning} />
                <TextField inputRef={input => this.addImageInput=input} label={language.category[siteLang].txt_add_image} />
                <Button raised onClick={e=>this.addCategory(e)}>{language.category[siteLang].btn_add}</Button>
            </form>
        )
    }

    renderCategoryList(categoryKeys){
        categoryKeys=categoryKeys.sort();
        return(
            <GridList tileAspect="1x1">
                {
                    categoryKeys.map((key, i) => 
                    {
                        let category=this.props.categories[key];
                        return (
                        <GridTile key={i} onClick={()=>this.props.showManageWords(key)}>
                            <Fab className="remove" mini onClick={(e,category)=>this.removeCategory(e,key)}>remove</Fab>
                            <GridTilePrimary>
                                <GridTilePrimaryContent>
                                    <div className="background" >
                                        <img alt="" src={category.imageURL}/>
                                    </div>
                                </GridTilePrimaryContent>
                            </GridTilePrimary>
                            <GridTileSecondary>
                                <GridTileTitle>{key}</GridTileTitle>
                                <div className="description">{category.description}</div>
                            </GridTileSecondary>
                        </GridTile>
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
                    <span>{language.category[siteLang].txt_new_start}</span>
                </div>
        )
    }
    
    render(){
       const categoryKeys=Object.keys(this.props.categories);
       return(
            <section className="category">
                    <input multiple ref={input=>this.fileInput=input} onChange={this.readFile} type="file" accept=".json"/>
                    <Fab mini onClick={()=>this.upload()}>backup</Fab>
                    <Fab mini onClick={this.showAddCategory}>add</Fab>
                    <div className={this.state.addCategory?"addCategory visible":"addCategory"}>
                        {this.renderAddCategoryForm()}
                    </div>
                    {categoryKeys.length > 0 ? this.renderCategoryList(categoryKeys) : this.renderNewStart()}
            </section>
       );
    }
}

export default Category;