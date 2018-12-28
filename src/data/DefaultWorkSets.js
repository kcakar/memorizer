let workSets = {
    "1": {
        "name": "My first workset",
        "questionLanguage": "en-US",
        "answerLanguage": "es-ES",
        "wordCount": 14,
        "description": "Daily words",
        "imageURL": "https://lh5.googleusercontent.com/proxy/lTlcDTGsbjdFntmmmKR8cT903AQ0CbcC3VAKXLbRN-1zDoFY8ZcT1fy8gDDHyUeb5jxIJ23jCbqGLO1EmWYIqLPxtwddZiTjpdhaEmzLKqh_eRNgkVohqim8W1CFzOYVI8iawt9nsNgECWw=w1064-h400-n-k-no",
        "createdBy": "Keremcan Çakar",
        "isPublic":true,
        "Views":0,
        "Claps":0,
        "Words taken":0,
        "Tags":["language","spanish","english","vocabulary"]
    },
}

let words={
    "1": {
        "question": "hola",
        "answer": "hi",
        "workSet": "1",
        "rightAnswer": 0,
        "wrongAnswer": 0
    },
    "2": {
        "question": "si",
        "answer": "yes",
        "workSet": "1",
        "rightAnswer": 0,
        "wrongAnswer": 0
    },
    "3": {
        "question": "que pasa",
        "answer": "what's up",
        "workSet": "1",
        "rightAnswer": 0,
        "wrongAnswer": 0
    },
    "4": {
        "question": "que pasa2",
        "answer": "what's up2",
        "workSet": "1",
        "rightAnswer": 0,
        "wrongAnswer": 0
    },
    "5": {
        "question": "que pasa3",
        "answer": "what's up3",
        "workSet": "1",
        "rightAnswer": 0,
        "wrongAnswer": 0
    }
}

let spanishCategories={
    "Spanish - 01":{"targetLanguage":"en-US","sourceLanguage":"es-ES","key":1,"wordCount":14,"description":"Daily words","imageURL": "https://lh5.googleusercontent.com/proxy/lTlcDTGsbjdFntmmmKR8cT903AQ0CbcC3VAKXLbRN-1zDoFY8ZcT1fy8gDDHyUeb5jxIJ23jCbqGLO1EmWYIqLPxtwddZiTjpdhaEmzLKqh_eRNgkVohqim8W1CFzOYVI8iawt9nsNgECWw=w1064-h400-n-k-no","createdBy":"Keremcan Çakar"},
};

module.exports = {
    defaultWorkSets:workSets,
    defaultWords:words
  }