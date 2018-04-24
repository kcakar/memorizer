/*  eslint-disable no-unused-vars*/
import React from 'react';
import { render } from 'react-dom';
import {Fab,Elevation,GridList,GridTile,GridTilePrimary,GridTilePrimaryContent,GridTileSecondary,GridTileTitle} from 'rmwc';

import interests from '../interests.js';
import '../css/Setup.css'
import language from '../Language';
import LanguageSwitcher from './LanguageSwitcher';


class Setup extends React.Component {
    saveSettings(){
        // let interests=[];
        
        // if(this.props.settings.interests && this.props.settings.interests!==undefined)
        // {
        //     interests=this.props.settings.interests;
        // }

        let settings={
            interests:[],
            language:"Türkçe",
            siteLanguage:"tr",
            translationLanguage: "İspanyolca"
        };

        this.props.saveSettings(settings);
    }

    // hasInterest(interest)
    // {
    //     return this.props.settings.interests.indexOf(interest.name) > -1;
    // }

    // switchInterest(interest,hasInterest)
    // {
    //     let settings=this.props.settings;
    //     if(hasInterest)
    //     {
    //         const index=settings.interests.indexOf(interest.name);
    //         if(index>-1)
    //         {
    //             settings.interests.splice(index,1);
    //         }
    //     }
    //     else{
    //         settings.interests.push(interest.name);
    //     }

    //     settings.language="Türkçe";
    //     settings.translationLanguage="İspanyolca";
    //     this.props.saveSettings(settings);
    //     this.props.addInterestSet(spanishCategories,spanishWords)
    // }
    
    render() {
        const siteLang=this.props.settings.siteLanguage;
        return (
            <section className="setup">
                <Fab mini onClick={()=>this.saveSettings()}>save</Fab>
                <Elevation z={3}>
                    <div className="settings">
                        <LanguageSwitcher siteLang={siteLang} changeLanguage={this.props.changeLanguage} />
                        { <h2>{language.settings[siteLang].choose_interest}</h2> }
                        {/* <div className="interests">
                            <GridList>
                                {
                                    interests.map((interest, i) =>{
                                        const hasInterest=this.hasInterest(interest);
                                        return (
                                        <GridTile onClick={()=>this.switchInterest(interest,hasInterest)} key={i} className={hasInterest?"active":""}>
                                            <GridTilePrimary>
                                                <GridTilePrimaryContent>
                                                    <img src={interest.image} alt="test" />
                                                </GridTilePrimaryContent>
                                            </GridTilePrimary>
                                            <GridTileSecondary>
                                                <GridTileTitle>{interest.name}</GridTileTitle>
                                            </GridTileSecondary>
                                        </GridTile>
                                    );})
                                
                                }
                            </GridList>
                        </div> */}
                    </div>
                </Elevation>
            </section>
        );
    }
}

export default Setup;