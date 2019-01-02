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
import {defaultWorkSets,defaultWords} from '../data/DefaultWorkSets.js';

class Discover extends React.Component{
    constructor(){
        super();
        this.state={
            filter:false,
            workSets:{}
        }
        this.renderWorkSetList=this.renderWorkSetList.bind(this);
        this.showFilter=this.showFilter.bind(this);
    }

    componentDidMount(){
        //pull-data-here
        this.setState({workSets:defaultWorkSets});
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
                        let workSet=this.state.workSets[key];
                        return (
                            <GridTile key={i} onClick={()=>this.props.showManageWordsDiscover(key)}>
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
                                <div className="created-by">
                                    <img src={workSet.creatorPhotoURL} alt=""/>
                                    <span>Keremcan Çakar</span>
                                </div>
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
                        <TextField label="Subject..." />
                    </fieldset>
                    <fieldset>
                        <Select placeholder="Any!" label="Language" options={['Cookies', 'Pizza', 'Icecream']}/>
                    </fieldset>
                    <fieldset>
                        <Select placeholder="Anyone!" label="Created by" options={['Cookies', 'Pizza', 'Icecream']}/>
                    </fieldset>
                    <Button className="filter__find" raised >Find</Button>
                </div>
            </aside>
        );
    }
    
    render(){
       const workSetKeys=Object.keys(this.state.workSets);
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