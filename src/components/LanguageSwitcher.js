/*  eslint-disable no-unused-vars*/

import React from "react";
import {render} from "react-dom";
import {Radio} from "rmwc";

class LanguageSwitcher extends React.Component{

    render(){
        let siteLang=this.props.siteLang;
        return(
            <div className="lang-selector">
                <Radio 
                    name="radio" 
                    defaultChecked={siteLang==="tr" ? true:false} 
                    onClick={()=>this.props.changeLanguage("tr")}>
                    Türkçe
                </Radio>
                <Radio 
                    name="radio" 
                    defaultChecked={siteLang==="en" ? true:false} 
                    onClick={()=>this.props.changeLanguage("en")}
                    >
                    English
                </Radio>
            </div>
        );
    }
}

export default LanguageSwitcher;