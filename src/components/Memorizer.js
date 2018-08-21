/*  eslint-disable no-unused-vars*/
import React from 'react';
import Setup from './Setup';
import ManageWords from './ManageWords';
import Landing from './Landing';
import Login from './Login';
import Header from './Header';
import Game from './Game';
import Category from './Category';
import ScrollToTop from './ScrollToTop';
import language from '../data/Language';
import {Router,Route,Redirect,Switch} from 'react-router-dom';
import {spanishWords,spanishCategories} from '../data/DefaultWords.js';
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
            categories:{},
            activeCategory:"",
            didLogin: false,
            userLogout:false,
            isLoading:true,
            gameSettings:{
                questionTypes:[],
            }
        }
        this.addCategory = this.addCategory.bind(this);
        this.addFromFile = this.addFromFile.bind(this);
        this.addWord = this.addWord.bind(this);
        this.cancelLoading=this.cancelLoading.bind(this);
        this.changeLanguage=this.changeLanguage.bind(this);
        this.fillDefaultCategories=this.fillDefaultCategories.bind(this);
        this.fillWordsFromLocalStorage=this.fillEverythingFromLocalStorage.bind(this);
        this.getSettings = this.getSettings.bind(this);
        this.handleTranslationChange=this.handleTranslationChange.bind(this);
        this.handleWordChange=this.handleWordChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.quitGame=this.quitGame.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.removeWord = this.removeWord.bind(this);
        this.renderCategory=this.renderCategory.bind(this);
        this.renderGame=this.renderGame.bind(this);
        this.renderHeader=this.renderHeader.bind(this);
        this.renderLogin=this.renderLogin.bind(this);
        this.renderManage=this.renderManage.bind(this);
        this.renderSetup=this.renderSetup.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.setGameSettings=this.setGameSettings.bind(this);
        this.showManageWords=this.showManageWords.bind(this);
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
            this.updateEverythingLocalStorage(nextState.user.userName,nextState.words,nextState.categories)
        }
    }

    updateSettings(settings)
    {
        localStorage.setItem(`${this.state.user.userName}-settings`, JSON.stringify(settings));
    }

    updateEverythingLocalStorage(username,words,categories)
    {
        if (words && words!==undefined && Object.keys(words).length>0) {
            localStorage.setItem(`${username}-words`, JSON.stringify(words));
        }
        if (categories && categories!==undefined && Object.keys(categories).length>0) {
            localStorage.setItem(`${username}-categories`, JSON.stringify(categories));
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

        words[word.wordTranslation]={
            key:Object.keys(words).length+1,
            language:this.state.settings.UserLanguage,
            category:this.state.activeCategory,
            translationLanguage: this.state.settings.LearningLanguage,
            translation:word.word,
            rightAnswer:0,
            wrongAnswer:0,
        }
        this.setState({words});
    }

    removeWord(words)
    {
        this.setState({words});
    }

    addCategory(category)
    {
        let categories = this.state.categories;

        categories[category.name]={
            key:Object.keys(categories).length+1,
            wordCount:0,
            description:category.description,
            imageURL:category.imageURL,
            createdBy:this.state.user.userName
        }
        this.setState({categories});
    }

    removeCategory(category)
    {
        console.log(category)
        console.log(category)
        console.log("category")
        
        if(Object.keys(category).length===0)
        {
            console.log("sıfır")
            localStorage.setItem(`${this.state.user.userName}-categories`, JSON.stringify(category));
        }
        this.setState({category});
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

    getSettings()
    {
        let settings = localStorage.getItem(`${this.state.user.userName}-settings`);
        if (settings && this.state.user.userName !== undefined ) {
            //daha önce login olmuş
            this.saveSettings(JSON.parse(settings));
            this.setState({
                //isSetup: false,
            })
        }
        else {
            //ilk kez login
            this.fillDefaultCategories();
        }

        this.fillEverythingFromLocalStorage();
    }

    saveSettings(settings) {
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
        this.updateSettings(settings);
    }

    fillEverythingFromLocalStorage()
    {
        let words=JSON.parse(localStorage.getItem(`${this.state.user.userName}-words`));
        if(words && words!==undefined)
        {
            this.setState({words});
        }
        let categories=JSON.parse(localStorage.getItem(`${this.state.user.userName}-categories`));
        if(categories && categories!==undefined)
        {
            this.setState({categories});
        }
    }

    cancelLoading(){
        this.setState({isLoading:false});
    }

    login(user)
    {
        this.setState({user});
        this.setState({didLogin:true});
        this.getSettings();
        this.cancelLoading();
        history.push('/memorizer/categories')
    }

    userLoggedOut(){
        this.setState({userLogout:false})
    }

    logout(user)
    {
        this.setState({didLogin:false});
        this.setState({userLogout:true});
    }

    addFromFile(categoryFile)
    {
        let categories = this.state.categories;
        let categoryName="es-ES - "+('0' + (Object.keys(categories).length+1)).slice(-2);
        
        categories[categoryName]={
            key:Object.keys(categories).length+1,
            wordCount:Object.keys(categoryFile.words).length,
            description:"",
            imageURL:"https://upload.wikimedia.org/wikipedia/commons/7/76/Flag_map_of_Greater_Spain.png",
            createdBy:this.state.user.userName
        }
        this.setState({categories});


        let words = this.state.words;
        
        Object.keys(categoryFile.words).map((key)=>{
            let word=categoryFile.words[key];

            words[key]={
                key:Object.keys(words).length+1,
                language:word.language,
                category:categoryName,
                translationLanguage: word.translationLanguage,
                translation:word.translation,
                rightAnswer:0,
                wrongAnswer:0,
            }
            return true;
        });
        this.setState({words});
    }

    fillDefaultCategories()
    {
        let categories=this.state.categories;
        let words=this.state.words;

        Object.keys(spanishCategories).map((key)=>{
            categories[key]=spanishCategories[key];
            return false;
        });

        Object.keys(spanishWords).map((key)=>{
            words[key]=spanishWords[key];
            return false;
        });

        this.setState({categories,words});
    }

    changeLanguage(lang)
    {
        let settings=this.state.settings;
        settings.siteLanguage=lang;
        
        this.setState({settings});
    }

    filterWordsByCategory()
    {
        let filteredWords={};
        Object.keys(this.state.words).map(key=>{
            if(this.state.words[key].category===this.state.activeCategory)
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
            .replace(/[^a-z0-9\-]/g,'')     // Remove anything that is not a letter, number or dash
            .replace(/-+/g,'-')             // Remove duplicate dashes
            .replace(/^-*/,'')              // Remove starting dashes
            .replace(/-*$/,'');             // Remove trailing dashes
    }

    startGame(){
        history.push('/memorizer/game/');
    }

    quitGame(){
        this.showManageWords(this.state.activeCategory);
    }

    showManageWords(key){
        if(key && key!==undefined && typeof(key)==="string")
        {
            this.setState({activeCategory:key});
            history.push('/memorizer/categories/'+this.toSeoUrl(key));
        }
        else{
            this.setState({activeCategory:""});
        }
    }

    showSetup(){
        history.push('/memorizer/setup');
    }

    showCategories(){
        history.push('/memorizer/categories');
    }

    showLanding(){
        history.push('/');
    }

    renderHeader(){
        return(
            <Header settings={this.state.settings} 
            user={this.state.user} 
            logout={this.logout} 
            didLogin={this.state.didLogin} 
            showCategories={this.showCategories} 
            showSetup={this.showSetup}
            showLanding={this.showLanding}
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
        return(
            <main className="memorizer">
                {this.renderHeader()}
                <section className="page-headline">
                    <div><h2>{this.state.activeCategory}</h2></div>
                </section>
                <section className="content">
                    <ManageWords 
                        setGameSettings={this.setGameSettings} 
                        gameSettings={this.state.gameSettings} 
                        startGame={this.startGame} 
                        settings={this.state.settings} 
                        user={this.state.user} 
                        words={this.filterWordsByCategory()} 
                        addWord={this.addWord} 
                        removeWord={this.removeWord}
                        handleWordChange={this.handleWordChange}
                        handleTranslationChange={this.handleTranslationChange}
                        category={this.state.activeCategory}
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
                        words={this.filterWordsByCategory()} 
                        user={this.state.user}
                        />
                </section>
            </main>
        );
    }

    renderCategory(){
        const siteLang=this.state.settings.siteLanguage;
        return(
            <main className="memorizer">
                {this.renderHeader()}
                <section className="page-headline">
                    <div><h2>{language.category[siteLang].page_headline}</h2></div>
                </section>
                <section className="content">
                    <Category settings={this.state.settings} addFromFile={this.addFromFile} removeCategory={this.removeCategory} addCategory={this.addCategory} categories={this.state.categories} showManageWords={this.showManageWords}/>
                </section>
            </main>
        );
    }

    renderLogin(){
        return (
        <main className="memorizer">
            <Login isLoading={this.state.isLoading} cancelLoading={this.cancelLoading} changeLanguage={this.changeLanguage} settings={this.state.settings} login={this.login} didLogin={this.state.didLogin} userLogout={this.state.userLogout} userLoggedOut={this.userLoggedOut}/>
        </main>);
    }

    render() {
        return(
            <Router history={history}>
                <ScrollToTop>
                    <Switch>
                        <Route exact path="/" component={Landing} /> 
                        <Route exact path="/memorizer/login" render={this.renderLogin}/>
                        {!this.state.didLogin ? <Redirect to="/memorizer/login"/> : ""}
                        <Route exact path="/memorizer/setup" render={this.renderSetup} />
                        <Route exact path="/memorizer/categories" render={this.renderCategory} />
                        <Route exact path="/memorizer/categories/:category" render={this.renderManage} />
                        <Route exact path="/memorizer/game" render={this.renderGame} />
                    </Switch>
                </ScrollToTop>
            </Router>
            );
    }
}

export default Memorizer;