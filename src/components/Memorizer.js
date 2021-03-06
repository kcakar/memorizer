/*  eslint-disable no-unused-vars*/
import React from 'react';
import {Router,Route,Redirect,Switch} from 'react-router-dom';
import {TransitionGroup,CSSTransition} from 'react-transition-group'

import Setup from './Setup';
import ManageWords from './ManageWords';
import Landing from './Landing';
import Login from './Login';
import Header from './Header';
import Game from './Game';
import Discover from './Discover';
import YourSpace from './YourSpace';
import ScrollToTop from './ScrollToTop';
import language from '../data/Language';
// import {spanishWords,spanishCategories} from '../data/DefaultWords.js';
import {defaultWorkSets,defaultWords} from '../data/DefaultWorkSets.js';
import { createBrowserHistory } from 'history';

import "../css/styles.css"; 

const history = createBrowserHistory();

class Memorizer extends React.Component {

    constructor() {
        super();
        //game screen
        this.state = {
            settings: {
                interests:[],
                siteLanguage:"en"
            },
            words: {},
            user:{},
            workSets:{},
            activeWorkSet:"",
            didLogin: false,
            userLogout:false,
            isLoading:false,
            gameSettings:{
                questionTypes:[],
            }
        }
        //this.fillDefaultWorkSets=this.fillDefaultWorkSets.bind(this);
        this.addFromFile = this.addFromFile.bind(this);
        this.addWord = this.addWord.bind(this);
        this.addWorkSet = this.addWorkSet.bind(this);
        this.changeLanguage=this.changeLanguage.bind(this);
        this.fillWordsFromLocalStorage=this.fillEverythingFromLocalStorage.bind(this);
        this.getSettings = this.getSettings.bind(this);
        this.handleTranslationChange=this.handleTranslationChange.bind(this);
        this.handleWordChange=this.handleWordChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.quitGame=this.quitGame.bind(this);
        this.removeWord = this.removeWord.bind(this);
        this.removeWorkSet = this.removeWorkSet.bind(this);
        this.renderDiscover=this.renderDiscover.bind(this);
        this.renderGame=this.renderGame.bind(this);
        this.renderHeader=this.renderHeader.bind(this);
        this.renderLogin=this.renderLogin.bind(this);
        this.renderManage=this.renderManage.bind(this);
        this.renderManageDiscover=this.renderManageDiscover.bind(this);
        this.renderSetup=this.renderSetup.bind(this);
        this.renderYourSpace=this.renderYourSpace.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.setGameSettings=this.setGameSettings.bind(this);
        this.showManageWords=this.showManageWords.bind(this);
        this.showManageWordsDiscover=this.showManageWordsDiscover.bind(this);
        this.showYourSpace = this.showYourSpace.bind(this);
        this.startGame=this.startGame.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.updateStatistics=this.updateStatistics.bind(this);
        this.userLoggedOut = this.userLoggedOut.bind(this);
    }

    componentWillUpdate(nextProps,nextState){
        if(!nextState.words)
        {
            nextState.words={};
        }
        if (nextState.user.userName && nextState.user.userName !== undefined )
        {
            this.updateEverythingLocalStorage(nextState.user.userName,nextState.words,nextState.workSets)
        }
    }

    updateSettings(settings,user)
    {
        localStorage.setItem(`${user.userName}-settings`, JSON.stringify(settings));
    }

    updateEverythingLocalStorage(username,words,workSets)
    {
        if (words && words!==undefined && Object.keys(words).length>0) {
            localStorage.setItem(`${username}-words`, JSON.stringify(words));
        }
        if (workSets && workSets!==undefined && Object.keys(workSets).length>0) {
            localStorage.setItem(`${username}-workSets`, JSON.stringify(workSets));
        }
    }

    updateStatistics(wordIndex,stat){
        let words={...this.state.words};
        if(stat<0)
        {
            words[wordIndex].wrongAnswer=words[wordIndex].wrongAnswer+1;
        }
        else{
            words[wordIndex].rightAnswer=words[wordIndex].rightAnswer+1;
        }
        this.setState({words});
    }

    addWord(word)
    {
        let words = this.state.words;

        words[Object.keys(words).length+1]={
            question:word.word,
            answer:word.wordTranslation,
            workSet:this.state.activeWorkSet,
            rightAnswer:0,
            wrongAnswer:0,
        }
        this.setState({words});
    }

    removeWord(word)
    {
        let words=this.state.words;
        delete words[word];
        this.setState({words});
    }

    addWorkSet(workSet)
    {
        let workSets = this.state.workSets;

        workSets[Object.keys(workSets).length+1]={
            name:workSet.name,
            wordCount:0,
            description:workSet.description,
            imageURL:workSet.imageURL,
            createdBy:this.state.user.userName,
            questionLanguage:"en-US",
            answerLanguage:"es-ES"
        }
        console.log(workSets)
        this.setState({workSets});
    }

    removeWorkSet(workSets)
    {
        if(Object.keys(workSets).length===0)
        {
            localStorage.setItem(`${this.state.user.userName}-workSets`, JSON.stringify(workSets));
        }
        this.setState({workSets});
    }

    handleWordChange(key,newWord){
        let words=this.state.words;
        let wordBackup={...words[key]};
        delete words[key];
        words[newWord]=wordBackup;
        this.setState({words});
    }

    handleTranslationChange(key,newTranslation){
        let words=this.state.words;
        words[key].translation=newTranslation;
        this.setState({words});
    }

    getSettings(user)
    {
        let settings = localStorage.getItem(`${user.userName}-settings`);
        if (settings && user.userName !== undefined ) {
            //daha önce login olmuş
            this.saveSettings(JSON.parse(settings),user);
            this.setState({
                //isSetup: false,
            })
        }
        else {
            //ilk kez login
            this.saveSettings({},user);
            //this.fillDefaultWorkSets();
        }

        this.fillEverythingFromLocalStorage(user);
    }

    saveSettings(settings,user) {
        console.log("saveSettings")
        if(!settings.siteLanguage)
        {
            settings.siteLanguage="en";
        }

        if(!settings.interests)
        {
            settings.interests=[];
        }
        this.setState({settings});
        // this.setState({isSetup: false});
        console.log(user)
        
        this.updateSettings(settings,user);
    }

    fillEverythingFromLocalStorage(user)
    {
        let words=JSON.parse(localStorage.getItem(`${user.userName}-words`));
        if(words && words!==undefined)
        {
            this.setState({words});
        }
        let workSets=JSON.parse(localStorage.getItem(`${user.userName}-workSets`));
        if(workSets && workSets!==undefined)
        {
            this.setState({workSets});
        }
    }

    login(user)
    {
        this.setState({user});
        this.setState({didLogin:true});
        this.getSettings(user);
        history.push('/memorizer/discover')
    }

    userLoggedOut(){
        this.setState({userLogout:false})
    }

    logout(user)
    {
        this.setState({didLogin:false});
        this.setState({userLogout:true});
    }

    addFromFile(workSetFile)
    {
        let workSets = this.state.workSets;
        let workSetName="es-ES - "+('0' + (Object.keys(workSets).length+1)).slice(-2);
        
        workSets[Object.keys(workSets).length+1]={
            name:workSetName,
            wordCount:Object.keys(workSetFile.words).length,
            description:"",
            imageURL:"https://upload.wikimedia.org/wikipedia/commons/7/76/Flag_map_of_Greater_Spain.png",
            createdBy:this.state.user.userName
        }
        this.setState({workSets});


        let words = this.state.words;
        
        Object.keys(workSetFile.words).map((key)=>{
            let word=workSetFile.words[key];

            words[key]={
                key:Object.keys(words).length+1,
                language:word.language,
                workSet:workSetName,
                translationLanguage: word.translationLanguage,
                translation:word.translation,
                rightAnswer:0,
                wrongAnswer:0,
            }
            return true;
        });
        this.setState({words});
    }

    // fillDefaultWorkSets()
    // {
    //     console.log("fillDefaultWorkSets")
    //     let workSets=this.state.workSets;
    //     let words=this.state.words;

    //     Object.keys(defaultWorkSets).map((key)=>{
    //         workSets[key]=defaultWorkSets[key];
    //         return false;
    //     });

    //     Object.keys(defaultWords).map((key)=>{
    //         words[key]=defaultWords[key];
    //         return false;
    //     });

    //     this.setState({workSets,words});
    // }

    changeLanguage(lang)
    {
        let settings=this.state.settings;
        settings.siteLanguage=lang;
        
        this.setState({settings});
    }

    filterWordsByWorkSet()
    {
        let filteredWords={};
        Object.keys(this.state.words).map(key=>{
            if(this.state.words[key].workSet===this.state.activeWorkSet)
            {
                filteredWords[key]=this.state.words[key];
            }
            return 0;
        });

        return filteredWords;
    }

    setGameSettings(settings)
    {
        this.setState({gameSettings:settings});
    }

    toSeoUrl(url) {
        return url.toString()               // Convert to string
            .normalize('NFD')               // Change diacritics
            .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
            .replace(/\s+/g,'-')            // Change whitespace to dashes
            .toLowerCase()                  // Change to lowercase
            .replace(/&/g,'-and-')          // Replace ampersand
            .replace(/[^a-z0-9-]/g,'')     // Remove anything that is not a letter, number or dash
            .replace(/-+/g,'-')             // Remove duplicate dashes
            .replace(/^-*/,'')              // Remove starting dashes
            .replace(/-*$/,'');             // Remove trailing dashes
    }

    startGame(){
        history.push('/memorizer/game/');
    }

    quitGame(){
        this.showManageWords(this.state.activeWorkSet);
    }

    cancelLoading(){
        this.setState({isLoading:false});
    }

    showManageWords(key){
        if(key && key!==undefined && typeof(key)==="string")
        {
            this.setState({activeWorkSet:key});
            history.push('/memorizer/yourspace/'+this.toSeoUrl(key));
        }
        else{
            this.setState({activeWorkSet:""});
        }
    }

    showManageWordsDiscover(key){
        if(key && key!==undefined && typeof(key)==="string")
        {
            this.setState({activeWorkSet:key});
            history.push('/memorizer/discover/'+this.toSeoUrl(key));
        }
        else{
            this.setState({activeWorkSet:""});
        }
    }
    
    showSetup(){
        history.push('/memorizer/setup');
    }

    showWorkSets(){
        history.push('/memorizer/discover');
    }

    showLanding(){
        history.push('/memorizer');
    }

    showYourSpace(){
        history.push('/memorizer/yourspace');
    }

    renderHeader(){
        return(
            <Header settings={this.state.settings} 
            user={this.state.user} 
            logout={this.logout} 
            didLogin={this.state.didLogin} 
            showWorkSets={this.showWorkSets} 
            showSetup={this.showSetup}
            showLanding={this.showLanding}
            showYourSpace={this.showYourSpace}
            />
        )
    }

    renderSetup()
    {
        const siteLang=this.state.settings.siteLanguage;

        return(
            <div>
                {this.renderHeader()}
                <section className="page-headline">
                    <div><h2>{language.settings[siteLang].page_headline}</h2></div>
                </section>
                <section className="content">
                    <Setup user={this.state.user} 
                           saveSettings={this.saveSettings} 
                           settings={this.state.settings}
                           changeLanguage={this.changeLanguage}
                           addInterestSet={this.addInterestSet}
                           />
                </section>
            </div>
        );
    }

    renderManage(){
        console.log("rendermanage")
        //pull-data-here pull below one
        //pull{this.state.workSets[this.state.activeWorkSet].name}
        return(
            <main className="memorizer">
                {this.renderHeader()}
                <section className="page-headline">
                    <div><h2>{this.state.workSets[this.state.activeWorkSet].name}</h2></div>
                </section>
                <section className="content">
                    <ManageWords 
                        setGameSettings={this.setGameSettings} 
                        gameSettings={this.state.gameSettings} 
                        startGame={this.startGame} 
                        settings={this.state.settings} 
                        user={this.state.user} 
                        words={this.filterWordsByWorkSet()} 
                        addWord={this.addWord} 
                        removeWord={this.removeWord}
                        handleWordChange={this.handleWordChange}
                        handleTranslationChange={this.handleTranslationChange}
                        workSet={this.state.activeWorkSet}
                        isDiscover={false}
                    />
                </section>
            </main>
         );
    }

    renderManageDiscover(){
        return(
            <main className="memorizer">
                {this.renderHeader()}
                <section className="page-headline">
                    <div><h2>{defaultWorkSets[this.state.activeWorkSet].name}  <span className="created-by">- {defaultWorkSets[this.state.activeWorkSet].createdBy}</span></h2></div>
                </section>
                <section className="content">
                    <ManageWords 
                        setGameSettings={this.setGameSettings} 
                        gameSettings={this.state.gameSettings} 
                        startGame={this.startGame} 
                        settings={this.state.settings} 
                        user={this.state.user} 
                        addWord={this.addWord} 
                        removeWord={this.removeWord}
                        handleWordChange={this.handleWordChange}
                        handleTranslationChange={this.handleTranslationChange}
                        workSet={this.state.activeWorkSet}
                        words={defaultWords} 
                        isDiscover={true}
                    />
                </section>
            </main>
         );
    }

    renderGame(){
        return(
            <main className="memorizer">
                {this.renderHeader()}
                <section className="content">
                    <Game 
                        gameSettings={this.state.gameSettings} 
                        quitGame={this.quitGame} 
                        settings={this.state.settings} 
                        updateStatistics={this.updateStatistics} 
                        words={this.filterWordsByWorkSet()} 
                        user={this.state.user}
                        />
                </section>
            </main>
        );
    }

    renderDiscover(){
        const siteLang=this.state.settings.siteLanguage;
        return(
            <main className="memorizer">
                {this.renderHeader()}
                <section className="page-headline">
                    <div><h2>{language.workSet[siteLang].page_headline}</h2></div>
                </section>
                <section className="content">
                    <Discover settings={this.state.settings} addFromFile={this.addFromFile} removeWorkSet={this.removeWorkSet} addWorkSet={this.addWorkSet} showManageWordsDiscover={this.showManageWordsDiscover}/>
                </section>
            </main>
        );
    }

    renderYourSpace(){
        const siteLang=this.state.settings.siteLanguage;
        return(
            <main className="memorizer">
                {this.renderHeader()}
                <section className="page-headline">
                    <div><h2>Your Space</h2></div>
                </section>
                <section className="content">
                    <YourSpace settings={this.state.settings} user={this.state.user} addFromFile={this.addFromFile} removeWorkSet={this.removeWorkSet} addWorkSet={this.addWorkSet} workSets={this.state.workSets} showManageWords={this.showManageWords}/>
                </section>
            </main>
        );
    }

    renderLogin(){
        return (
        <main className="memorizer">
            <Login changeLanguage={this.changeLanguage} settings={this.state.settings} login={this.login} didLogin={this.state.didLogin} userLogout={this.state.userLogout} userLoggedOut={this.userLoggedOut}/>
        </main>);
    }

    render() {
        console.log(history.location.pathname)
        return(
            <Router history={history}>
                <ScrollToTop>
                    <Switch>
                        <Redirect exact path="/" to={"/memorizer"} /> 
                        <Route exact path="/memorizer/" component={Landing} /> 
                        <Route exact path="/memorizer/login" render={this.renderLogin}/>
                        {!this.state.didLogin ? <Redirect to="/memorizer/login"/> : ""}
                        <Route exact path="/memorizer/setup" render={this.renderSetup} />
                        <Route exact path="/memorizer/discover" render={this.renderDiscover} />
                        <Route exact path="/memorizer/discover/:workSet" render={this.renderManageDiscover} />
                        <Route exact path="/memorizer/game" render={this.renderGame} />
                        <Route exact path="/memorizer/yourspace" render={this.renderYourSpace} />
                        <Route exact path="/memorizer/yourspace/:workSet" render={this.renderManage} />
                    </Switch>
                </ScrollToTop>
            </Router>
            );
    }
}

export default Memorizer;