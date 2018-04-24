/*  eslint-disable no-unused-vars*/
import React from 'react';
import {render} from 'react-dom';

import { Slider,Checkbox,Button,TextField,TextFieldIcon,Elevation,Fab } from 'rmwc';
import '../css/Table.css';
import '../css/ManageWords.css';
import language from '../Language';

class ManageWords extends React.Component{

    constructor(){
        super();

        this.state={
            addWord:false
        }

        this.addWord=this.addWord.bind(this);
        this.handleWordChange=this.handleWordChange.bind(this);
        this.removeWord=this.removeWord.bind(this);
        this.showAddWords=this.showAddWords.bind(this);
        this.filterWordsByCategory=this.filterWordsByCategory.bind(this);
        this.setGameSettings=this.setGameSettings.bind(this);
    }

    showAddWords(){
        this.setState({addWord:!this.state.addWord});
    }

    componentWillMount(){
        this.setState({addWord:false});
    }

    addWord(e){
        e.preventDefault();

        let word={
            word:this.addWordInput.value,
            wordTranslation:this.addMeaningInput.value
        }
        this.addWordInput.value="";
        this.addMeaningInput.value="";
        this.addWordInput.focus();

        this.props.addWord(word);
    }

    removeWord(word){
        let words=this.props.words;
        delete words[word];
        this.props.removeWord(words);
    }

    setGameSettings(evt,key)
    {
        let settings = this.props.gameSettings;
        switch (key) {
            case "test":
                if(evt.target.checked)
                {
                    let i = settings.questionTypes.indexOf("test");
                    if(i===-1)
                    {
                        settings.questionTypes.push("test");
                    }
                }
                else{
                    let i = settings.questionTypes.indexOf("test");
                    settings.questionTypes.splice(i, 1);
                }
                break;

            case "written":
                if(evt.target.checked)
                {
                    let i = settings.questionTypes.indexOf("written");
                    if(i===-1)
                    {
                        settings.questionTypes.push("written");
                    }
                }
                else{
                    let i = settings.questionTypes.indexOf("written");
                    settings.questionTypes.splice(i, 1);
                }
                break;
            default:
                break;
        }
        this.props.setGameSettings(settings);
    }

    handleWordChange(e,key){
        this.props.handleWordChange(key,e.target.value);
    }

    handleTranslationChange(e,key){
        this.props.handleTranslationChange(key,e.target.value);
    }

    filterWordsByCategory(category)
    {
        return Object.keys(this.props.words).filter(key=> this.props.words[key].category === category);
    }

    renderWordRow(wordInfo,word){
        return(
            <tr key={wordInfo.key}>
                <td>
                    <Fab mini onClick={()=>this.removeWord(word)}>remove</Fab>
                    <TextField onChange={(e)=>this.handleWordChange(e,word)} value={word} />
                </td>
                <td>
                    <TextField onChange={(e)=>this.handleTranslationChange(e,word)} value={wordInfo.translation} />
                </td>
                <td><span className="right">{wordInfo.rightAnswer}</span> - <span className="wrong">{wordInfo.wrongAnswer}</span></td>
            </tr>
        )
    }

    renderAddWordForm()
    {
        const siteLang=this.props.settings.siteLanguage;
        return (
            <form action="#">
                <TextField inputRef={input => this.addWordInput=input}  label={language.managewords[siteLang].txt_add_word} />
                <TextField inputRef={input => this.addMeaningInput=input} label={language.managewords[siteLang].txt_add_meaning} />
                <Button raised onClick={e=>this.addWord(e)}>{language.managewords[siteLang].btn_add}</Button>
            </form>
        )
    }

    render(){
        const siteLang=this.props.settings.siteLanguage;
        let filteredKeys=this.filterWordsByCategory(this.props.category);
        return(
           <section className="manageWords">
                <Fab mini onClick={this.showAddWords}>add</Fab>
                <Fab mini onClick={this.props.startGame}>play_arrow</Fab>
                <Fab mini onClick={this.props.startGame}>trending_up</Fab>

                <div className={this.state.addWord?"addWords visible":"addWords"}>
                    {this.renderAddWordForm()}
                </div>

                <Elevation z={3}>
                    <div className="gameSettings">
                        <h2>Game Setting</h2>
                        <div className="setting-group">
                            <span className="setting-title">{language.managewords[siteLang].txt_question_types}:</span>
                            <Checkbox 
                                label={language.managewords[siteLang].txt_question_type_test} 
                                value="Test" 
                                onChange={(evt) => {this.setGameSettings(evt,"test")}}
                            />
                            <Checkbox 
                                label={language.managewords[siteLang].txt_question_type_written} 
                                value="Written" ref={(c) => this.chckWritten = c} 
                                onChange={evt => this.setGameSettings(evt,"written")}
                            />
                        </div>
                    </div>
                </Elevation>

                <Elevation z={3}>
                    <div className="words">
                        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                            <thead>
                                <tr>
                                    <th className="mdl-data-table__cell--non-numeric">{language.managewords[siteLang].table_words}</th>
                                    <th>{language.managewords[siteLang].table_meaning}</th>
                                    <th>{language.managewords[siteLang].table_performance}</th>
                                </tr>
                            </thead>
                            <tbody>
                                { filteredKeys.sort().map(key=>this.renderWordRow(this.props.words[key],key))}    
                            </tbody>
                        </table>
                    </div>
                </Elevation>

           </section>
        );
    }
}

export default ManageWords