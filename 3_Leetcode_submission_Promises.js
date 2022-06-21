// I am doing not using Async Await
// Chain of 'then' of promise

const pupeet = require('puppeteer');
const fs = require('fs')
const path = require('path')
let first_result;
let question_code = fs.readFileSync( path.join(__dirname,'two_sum.txt') ) ;

const openBrouser = pupeet.launch({headless:false,
    // defaultViewport: null,
    args:['--start maximized'],
});
let page;

// console.log(""+question_code);


openBrouser.then( (brouser)=>{
    let pages = brouser.pages() ;
    return pages;
} ).then( (pages)=>{
    page = pages[0];
    return page;
} ).then( ()=>{
   return page.goto('https://www.google.com')
} ).then( ()=>{
    page.setViewport({ width: 1366, height: 768});
   return page.waitForSelector('input[class="gLFyf gsfi"]');
} ).then( ()=>{
   return page.type('input[class="gLFyf gsfi"]',"leetcode login",{delay:50});
} ).then( ()=>{
    return page.keyboard.press("Enter") ; // now search resulte loaded
} ).then( ()=>{
   return page.waitForSelector('h3[class="LC20lb MBeuO DKV0Md"]'); // clicked on first result 
          
} )


.then( ()=>{
    return page.click('h3[class="LC20lb MBeuO DKV0Md"]') ;
} ).then( ()=>{
    return page.waitForSelector('input[name="login"]',{visible:true});
 } ).then( ()=>{
    return page.type('input[name="login"]',"_yourUsername") ;
 } ).then( ()=>{
    return page.waitForSelector('input[name="password"]',{visible:true});
 } ).then( ()=>{
    return page.type('input[name="password"]',"_yourPass") ;
 } ).then( ()=>{
    return page.keyboard.press("Enter") ; // Login via username and password and hit enter
} )
// after Login Succesfully
.then( ()=>{
    return page.waitForSelector('#navbar-root > div > div > div.navbar-left-container__3-qz > div:nth-child(3) > a'); // clicked on first result 
 } ).then( ()=>{
     return page.click('#navbar-root > div > div > div.navbar-left-container__3-qz > div:nth-child(3) > a',{delay:100}) ;
 } )

// click on daily question

// .then( ()=>{
//     return page.waitForNavigation({
//         waitUntil: 'networkidle0',
//       });
// } )

.then( ()=>{
    return page.waitFor(5000) ;
} )






 .then( ()=>{
     let selector = 'a[href="/problems/two-sum"]'; // two sum problem
    return page.waitForSelector(selector,{delay:100}); // clicked on first result 
 } ).then( ()=>{
    let selector = 'a[href="/problems/two-sum"]'; // two sum problem
     return page.click(selector,{delay:100}) ;
 } )
 .then( ()=>{
    return page.waitFor(5000);
} )
 .then( ()=>{ //at editor click
     return page.waitForSelector("span[class='cm-variable']") ;
 } )

 .then( ()=>{
    let click_ = page.click("span[class='cm-variable']");
    console.log("click done" , )
    return click_;
} ).then( ()=>{
   return page.keyboard.down('ArrowDown');
} ).then( ()=>{
    return page.keyboard.down('Control');
} ).then( ()=>{
    return page.keyboard.down('A');
} ).then(()=>{
  return page.keyboard.press('Backspace');
})
// main code area has been cleaned now , prepare code at clipboard

.then( ()=>{
    return page.click('.container__2WTi .func__1DsC button') ;
} ).then( ()=>{
    return page.waitForSelector('.ace_content .ace_layer.ace_print-margin-layer');
} ) .then( ()=>{
    return page.click('.ace_content .ace_layer.ace_print-margin-layer');
} ).then( ()=>{
    return page.keyboard.down('Control');
} ).then( ()=>{
    return page.keyboard.down('A');
} ).then(()=>{
  return page.keyboard.press('Backspace');
})
.then( ()=>{
    return page.keyboard.up('Control');
} ).then( ()=>{
    return page.keyboard.up('A');
} )
.then( ()=>{
    let COde = "" + question_code;
    page.waitFor(3000);
    return page.type('.ace_content .ace_layer.ace_print-margin-layer',COde) ;
} )


.then( ()=>{
    return page.keyboard.down('Control');
} ).then( ()=>{
    return page.keyboard.down('A');
} ).then(()=>{
  return page.keyboard.press('X');
})
.then( ()=>{
    return page.keyboard.up('Control');
} ).then( ()=>{
    return page.keyboard.up('A');
} )
  //now copied to clipboard
// now paste it
.then( ()=>{
    return page.click("pre[class=' CodeMirror-line ']");
} ).then( ()=>{
    return page.keyboard.down('Control');
} ).then( ()=>{
    return page.keyboard.press('V');
})


 // run code

 .then( ()=>{
     let selector = 'button[data-cy="run-code-btn"]' ;
      return page.click(selector) ;
 } )
//  .then( ()=>{
//      return page.waitFor(7000) ;
//  } )
 .then( ()=>{
     return page.waitForSelector("div[class='finished__Zi5m']") ;
 } )
// accecpted
// now we can submit this    

.then( ()=>{
   console.log("suceesfully run, now trying to sumbit code")
    return page.click("button[data-cy='submit-code-btn'] span[class='css-1km43m6-BtnContent e5i1odf0']")
} ).then( ()=>{
    console.log("Code Sumbmitted succesfully") ;
} )








