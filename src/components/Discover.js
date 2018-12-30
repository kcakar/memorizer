/*  eslint-disable no-unused-vars*/
import React from 'react';
import {TextField,Select,Button,Fab,GridList,GridTile,GridTilePrimary,GridTilePrimaryContent,GridTileSecondary,GridTileTitle} from 'rmwc';
import atomIMG from '../images/atom.png';
import piIMG from '../images/pi.png';
import dnaIMG from '../images/dna.png';
import rocketIMG from '../images/rocket.png';
import angularIMG from '../images/angular.png';
import language from '../data/Language';
import images from '../data/images';

class Discover extends React.Component{
    constructor(){
        super();
        this.state={
            filter:false
        }
        this.renderWorkSetList=this.renderWorkSetList.bind(this);
        this.showFilter=this.showFilter.bind(this);
    }

    showFilter(){
        this.setState({
                filter:!this.state.filter,
                addWorkSet:!this.state.filter?false:this.state.addWorkSet
            });
    }

    renderWorkSetList(workSetKeys){
        workSetKeys=workSetKeys.sort();
        return(
            <GridList tileAspect="1x1">
                {
                    workSetKeys.map((key, i) => 
                    {
                        let workSet=this.props.workSets[key];
                        return (
                            <GridTile key={i} onClick={()=>this.props.showManageWords(key)}>
                                <GridTilePrimary>
                                    <GridTilePrimaryContent>
                                        <div className="background" style={{backgroundImage: "url(" + workSet.imageURL + ")"}} >
                                        </div>
                                    </GridTilePrimaryContent>
                                </GridTilePrimary>
                                <GridTileSecondary >
                                    <GridTileTitle>{workSet.name}</GridTileTitle>
                                    <img className="source-language" alt="" src={images.flags[workSet.questionLanguage]}/>
                                    <img className="target-language" alt="" src={images.flags[workSet.answerLanguage]}/>
                                    <div className="description">{workSet.description}</div>
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
                    <span>{language.workSet[siteLang].txt_new_start}</span>
                </div>
        )
    }

    renderFilterSection()
    {
        return(
            <aside className="filter">
                <div className="filter__controls">
                    <fieldset>
                        <TextField outlined label="Subject..." />
                    </fieldset>
                    <fieldset>
                        <Select placeholder="Any!" label="Language" enhanced options={['Cookies', 'Pizza', 'Icecream']}/>
                    </fieldset>
                    <fieldset>
                        <Select placeholder="Anyone!" label="Created by" enhanced options={['Cookies', 'Pizza', 'Icecream']}/>
                    </fieldset>
                    <Button className="filter__find" raised >Find</Button>
                </div>
            </aside>
        );
    }
    
    render(){
       const workSetKeys=Object.keys(this.props.workSets);
       return(
            <section className="category">
                <Fab mini onClick={this.showFilter}>search</Fab>
                <div className={this.state.filter?"filter-container visible":"filter-container"}>
                    {this.renderFilterSection()}
                </div>
                {workSetKeys.length > 0 ? this.renderWorkSetList(workSetKeys) : this.renderNewStart()}
            </section>
       );
    }
}

export default Discover;