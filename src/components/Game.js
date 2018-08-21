/*  eslint-disable no-unused-vars*/
import React from 'react';
import {Snackbar,LinearProgress,Fab,Elevation,Radio,TextField,Button,Card,CardPrimary,CardTitle,CardSubtitle,CardSupportingText,CardActions,CardAction} from 'rmwc';
import language from '../data/Language';


// const questionTypes={
//     "written":0,
//     "test":1,       
// }

const questionDirection={
    straight:0,
    reversed:1
}

class Game extends React.Component{
    constructor(){
        super();

        this.state={
            gameProgress:0,
            isError:false,
            questions:[],
            currentQuestion:{},
            colorWeight:200,
            rightImage:1,
            wrongImage:1,
            testOptionCount:4,
            snackbarIsOpen:false,
            snackbarMessage:"",
            totalQuestionCount:0,
            questionTypes:{},
            isHighlight:false,
            utterance:null
        }
        
        this.randomlyPickWords=this.randomlyPickWords.bind(this);
        this.startGame=this.startGame.bind(this);
        this.handleAnswer=this.handleAnswer.bind(this);
        this.checkAnswer=this.checkAnswer.bind(this);
        this.wrongAnswer=this.wrongAnswer.bind(this);
        this.nextQuestion=this.nextQuestion.bind(this);
        this.restart=this.restart.bind(this);
        this.getChoices=this.getChoices.bind(this);
        this.rightAnswer=this.rightAnswer.bind(this);
        this.cleanInputs=this.cleanInputs.bind(this);
        this.renderQuestion=this.renderQuestion.bind(this);
        this.renderSummary=this.renderSummary.bind(this);
        this.renderStatusBar=this.renderStatusBar.bind(this);
        this.renderWrittenQuestion=this.renderWrittenQuestion.bind(this);
        this.renderListeningQuestion=this.renderListeningQuestion.bind(this);
        this.renderSnackbar=this.renderSnackbar.bind(this);
        this.createQuestion=this.createQuestion.bind(this);
        this.getSynthSpeech=this.getSynthSpeech.bind(this);


    }
    
    componentWillMount(){
        this.startGame();
    }

    startGame(){
        const gameWords = this.randomlyPickWords();

        let questionTypes={};

        if(this.props.gameSettings.questionTypes.length===0)
        {
            questionTypes["test"]=0;
        }
        else{
            for(let i=0;i<this.props.gameSettings.questionTypes.length;i++)
            {
                questionTypes[this.props.gameSettings.questionTypes[i]]=i;
            }
        }


        let state=this.state;
        state.questionTypes=questionTypes;
        this.setState(
            {
                state:state,
            });

        const questions=this.generateQuestions(gameWords);
        this.setState(
        {
            gameProgress:0,
            isError:false,
            currentQuestion:questions[0],
            questions:questions,
            totalQuestionCount:questions.length
        });

        this.getSynthSpeech(questions[0]);   
    }

    restart(){
        const gameWords = this.randomlyPickWords();
        const questions=this.generateQuestions(gameWords);
        
        this.setState({
            gameProgress:0,
            isError:false,
            questions:questions,
            currentQuestion:questions[0]
        })
    }

    randomlyPickWords(){
        let wordPool = this.objectToArray(this.props.words);
        let size=wordPool.length;
        let gameWords=[];

        if(size > wordPool.length)
        {
            size = wordPool.length;
        }
        for(let i=0;i<size;i++){
            const index = this.getRandomIndex(wordPool);
            gameWords.push(wordPool[index]);
            wordPool.splice(index, 1);
        }
        return gameWords;
    }
    
    getRandomIndex(array){
        return Math.floor(Math.random()*array.length)
    }

    getRandomQuestionType(){
        return Math.floor(Math.random()* Object.keys(this.state.questionTypes).length)
    }

    objectToArray(obj){
        const arr=[];
        const objKeys=Object.keys(obj);

        for(let i=0;i<objKeys.length;i++){
            let word={...obj[objKeys[i]]};
            word.word=objKeys[i];
            arr.push(word);
        }
        return arr;
    }

    getRate(right,wrong){
        let totalAnswer=right+ wrong;

        if(totalAnswer > 0)
        {
            return ((100*right)/totalAnswer).toFixed(2)
        }
        else{
            return (0).toFixed(2);
        }
    }

    getChoices(gameWords,question,gameWord){
        let choices=[];
        
        let words=[...gameWords];
        words.splice(words.indexOf(gameWord),1);
        //fill the options
        for(let i=0;i<this.state.testOptionCount;i++)
        {
            const index=this.getRandomIndex(words);
            const word=words[index];
            if(question.direction===questionDirection.reversed)
            {
                choices.push(words[index].word);
            }
            else{
                choices.push(words[index].translation);
            }
            words.splice(index,1);
        }

        //add the right answer
        const answerIndex=this.getRandomIndex(Array(choices.length+1).fill());
        choices.splice(answerIndex, 0, question.questionAnswer);
        return choices;
    }

    createQuestion(gameWord,gameWords) {
        let question = {};
        question.type=this.getRandomQuestionType();

        let direction=1; //straight direction
        if(question.type !== this.state.questionTypes.listening) //listening is always straight!
        {
            direction=Math.random();
        }

        if (direction)//decide question direction Enlgish -> turkish vs turkish -> english
        {
            question.direction=questionDirection.straight;
            question.questionLanguage = gameWord.translationLanguage;
            question.questionWord = gameWord.word;

            if(question.type === this.state.questionTypes.listening)
            {
                question.questionAnswer = gameWord.word;
            }
            else{
                question.questionAnswer = gameWord.translation;
            }
            question.questionRate = gameWord.rate;
            question.index = gameWord.word;
        }
        else {
            question.direction=questionDirection.reversed;
            question.questionLanguage=gameWord.language;
            question.questionWord=gameWord.translation;
            question.questionAnswer=gameWord.word;
            question.questionRate=gameWord.rate;
            question.index=gameWord.word;
        }
        
        if(question.type === this.state.questionTypes.test)
        {
            question.choices = this.getChoices(gameWords,question,gameWord);
        }
        return question;
    }

    generateQuestions(gameWords){
        let questions=[];
        for(let i=0;i<gameWords.length;i++){
            gameWords[i].rate=0;

            let totalAnswer=gameWords[i].rightAnswer+ gameWords[i].wrongAnswer;

            if(totalAnswer > 0)
            {
                gameWords[i].rate= this.getRate(gameWords[i].rightAnswer,gameWords[i].wrongAnswer);
            }

            const question=this.createQuestion(gameWords[i],gameWords);
            questions.push(question);
        }
        console.table(questions)
        return questions;
    }

    handleAnswer(input){
        const answer=input.value;
        if(answer.toLowerCase() === this.state.currentQuestion.questionAnswer.toLowerCase())
        {
            this.rightAnswer(input);
        }
        else if(this.state.currentQuestion.type===this.state.questionTypes.test)
        {
            this.wrongAnswer(input);
        }
    }

    checkAnswer(){
        const answer=this.state.answer;
        if(answer !== undefined && answer && answer.length>0)
        {
            if(answer.toLowerCase() === this.state.currentQuestion.questionAnswer.toLowerCase())
            {
                this.setState({isError:false});
                this.props.updateStatistics(this.state.currentQuestion.index,1);
                this.nextQuestion();
            }
            else{
                this.setState({isError:true});
            }
        }
        else{
            this.setState({isError:true})
        }
    }

    rightAnswer(input){
        this.setState({isError:false});
        this.props.updateStatistics(this.state.currentQuestion.index,1);
        this.nextQuestion(input);
        this.showSnackBar("Doğru cevap!");
        
    }

    wrongAnswer(input){
        this.props.updateStatistics(this.state.currentQuestion.index,-1);
        this.nextQuestion(input);
        this.showSnackBar("Yanlış cevap!");
    }

    showSnackBar(message)
    {
        this.setState({snackbarMessage:message,snackbarIsOpen:true});
    }

    nextQuestion(input){
        let progress=this.state.gameProgress+1;

        this.cleanInputs(input);
        if(progress===this.state.questions.length)
        {
            this.setState({
                gameProgress:progress,
            });
        }
        else{
            this.setState({
                gameProgress:progress,
                currentQuestion:this.state.questions[progress],
            });

            this.getSynthSpeech(this.state.questions[progress]);
        }
    }

    cleanInputs(input){
        if(input)
        {
            input.value="";
            input.checked=false;
        }
    }


    switchColorWeight(weight){
        this.setState({colorWeight:weight});
    }

    renderStatusBar(){

        const progress=this.state.gameProgress/this.state.totalQuestionCount;
        return(
            <div className="status-bar">
                <LinearProgress progress={progress}></LinearProgress>
            </div>
        )
    }

    renderQuestion(){
        const siteLang=this.props.settings.siteLanguage;
        
        console.log(this.state.currentQuestion.type === this.state.questionTypes.written)
        console.log(this.state.currentQuestion.type === this.state.questionTypes.listening)
        console.log(this.state.currentQuestion.type === this.state.questionTypes.test)
        if(this.state.currentQuestion.type === this.state.questionTypes.written)
            return this.renderWrittenQuestion(siteLang);
        else if(this.state.currentQuestion.type === this.state.questionTypes.listening)
            return this.renderListeningQuestion(siteLang);
        else if(this.state.currentQuestion.type === this.state.questionTypes.test)
            return this.renderTestQuestion(siteLang);

        return this.renderTestQuestion(siteLang);
    }

    getSynthSpeech(question)
    {
        if(question.type!==this.state.questionTypes.listening)
        {
            return;
        }
        window.speechSynthesis.cancel();
        let language=question.questionLanguage;

        let voices = window.speechSynthesis.getVoices();
        let wantedVoices=[];
        voices.forEach(voice=>{
            if(voice.lang===question.questionLanguage)
            {
                wantedVoices.push(voices.indexOf(voice));
            }
        });
        if(wantedVoices.length===0)
        {
            wantedVoices.push(voices[0]);
        }
        
        let randomVoiceIndex=Math.floor(Math.random()* wantedVoices.length);
        window.speechSynthesis.lang=question.questionLanguage;

        
        let utterance=this.state.utterance;

        utterance = new SpeechSynthesisUtterance(question.questionWord);
        utterance.onstart= (e=>{
            this.setState({isHighlight:true});
        });
        utterance.onend= (e=>{
            this.setState({isHighlight:false});
        });
        utterance.voice = voices[randomVoiceIndex];
        this.setState({utterance});
        window.speechSynthesis.speak(utterance);
    }

    renderWrittenQuestion(siteLang)
    {
        return(
            <div className="question written">
                <Button className="btn-quit-game" onClick={this.props.quitGame}>{language.game[siteLang].btn_quit_game}</Button>
                <Card>
                    <CardPrimary>
                        <CardTitle large="true" >{language.game[siteLang].written_question}</CardTitle>
                        <CardSubtitle large="true" >
                            {this.state.currentQuestion.questionWord}
                        </CardSubtitle>
                        <div className="the-line"></div>
                        <div className="answer">
                            <TextField 
                                className={this.state.isError?"error" :""}
                                label={language.game[siteLang].txt_answer} 
                                fullwidth 
                                inputRef={input => this.answerInput=input} 
                                onChange={(e)=>this.handleAnswer(e.target)}
                            />
                        </div>
                    </CardPrimary>
                    <CardActions>
                        <CardAction onClick={()=>this.checkAnswer()}>{language.game[siteLang].btn_check}</CardAction>
                        <CardAction onClick={()=>this.wrongAnswer()}>{language.game[siteLang].btn_skip}</CardAction>
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderTestQuestion(siteLang)
    {
        return (
            <div className="question test">
                <Button className="btn-quit-game" onClick={this.props.quitGame}>{language.game[siteLang].btn_quit_game}</Button>
                <Card>
                    <CardPrimary>
                        <CardTitle large="true" >{language.game[siteLang].test_question}</CardTitle>
                        <CardSubtitle large="true" >
                            {this.state.currentQuestion.questionWord}
                        </CardSubtitle>
                        <div className="the-line"></div>
                        <div className="answer options">
                            {
                                this.state.currentQuestion.choices.map((choice,i)=>{
                                return (
                                    <Radio
                                        key={i}
                                        label={choice}
                                        value={choice}
                                        name="answerGroup"  
                                        onChange={e => this.handleAnswer( e.target)}
                                    />)
                            })}
                        </div>
                    </CardPrimary>
                    <CardSupportingText>
                    </CardSupportingText>
                </Card>
            </div>
        )
    }

    renderListeningQuestion(siteLang){
        let classList=["btn-hearing"];
        if(this.state.isHighlight)
        {
            classList.push("highlight");
        }

        return(
            <div className="question listening">
                <Button className="btn-quit-game" onClick={this.props.quitGame}>{language.game[siteLang].btn_quit_game}</Button>
                <Card>
                    <CardPrimary>
                        <CardTitle large="true" >Write what you hear!</CardTitle>
                        <Fab className={classList.join(" ")} mini onClick={e=>this.getSynthSpeech(this.state.currentQuestion)}>hearing</Fab>
                        <div className="the-line"></div>
                        <div className="answer">
                            <TextField 
                                className={this.state.isError?"error" :""}
                                label={language.game[siteLang].txt_answer} 
                                fullwidth 
                                inputRef={input => this.answerInput=input} 
                                onChange={(e)=>this.handleAnswer(e.target)}
                            />
                        </div>
                    </CardPrimary>
                    <CardActions>
                        <CardAction onClick={()=>this.checkAnswer()}>{language.game[siteLang].btn_check}</CardAction>
                        <CardAction onClick={()=>this.wrongAnswer()}>{language.game[siteLang].btn_skip}</CardAction>
                    </CardActions>
                </Card>
            </div>
        )
    }

    renderSummary(){
        const siteLang=this.props.settings.siteLanguage;
        return  (
            <section className="game">
                <div className="continue-div">
                    <Button unelevated onClick={this.restart}>{language.game[siteLang].end_screen_continue}</Button>
                    <Button unelevated onClick={this.props.quitGame}>{language.game[siteLang].btn_quit_game}</Button>
                </div>
                <div className="summary">
                {
                    this.state.questions.map((question,i)=>{
                    const word=this.props.words[question.index];
                    return (
                        <div 
                            key={i} 
                            className="summary-row" 
                            // style={
                            //     {backgroundColor:colors[color][this.state.colorWeight]}
                            //     }
                            >
                            <span>{question.questionAnswer.toUpperCase()}</span>
                            {/* <span>{question.questionWord}</span> */}
                            <span>%{this.getRate(word.rightAnswer,word.wrongAnswer)} success rate</span>
                        </div>
                    );
                })}
                </div>
            </section>
        );
    }

    renderSnackbar(message){
        return(
            <Snackbar
                show={this.state.snackbarIsOpen}
                onClose={evt => this.setState({snackbarIsOpen: false})}
                message={this.state.snackbarMessage}
            />
          );
    }

    render(){
        if(this.state.gameProgress===this.state.questions.length)
        {
            return this.renderSummary();
        }
        else{
            return(
                <div>
                    <section className="game">
                        {this.renderStatusBar()}
                        {this.renderQuestion()}
                    </section>
                    {this.renderSnackbar()}
                </div>
            )
        }
    }
}

export default Game