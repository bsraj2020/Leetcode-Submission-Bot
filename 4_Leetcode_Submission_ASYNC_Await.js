const puppeteer = require('puppeteer') ;
const fs = require('fs') ;

const path = require('path')
let page ;
let Code = fs.readFileSync(path.join(__dirname,'two_sum.txt')) ;
/*
function click_and_wait( selcetor, curr_Page )
{
    return new Promise( (resolve,reject)=>
    {
         let is_visible = curr_Page.waitForSelector('class=kuch') ;
         is_visible.then( function () {
             return curr_Page.click('class=kuch');
         } ).then( ()=>{
             resolve();
             reject();
         } ).catch( (err)=>{
             console.log(err);
         } )
    } )
}

*/

async function wait_type( selector,to_type,cpage )
{
    
  await cpage.waitForSelector(selector,{visible:true});    
  return cpage.type(selector,to_type); 
   
}
async function wait_click( selector,cpage )
{
    
  await cpage.waitForSelector(selector,{visible:true});    
  return cpage.click(selector,{delay:100}); 
   
}
async function wait_type_enter( selector,to_type,cpage )
{
    await cpage.waitForSelector(selector,{visible:true}) ;
    await cpage.type(selector,to_type) ;
    return cpage.keyboard.press('Enter',{delay:100});
}

async function wait_clear(selector,cpage)
{
    await cpage.waitForSelector(selector,{delay:100}) ;
    await cpage.click(selector,{delay:100});
    await cpage.keyboard.down('Control');
    await cpage.keyboard.down('A');
    await cpage.keyboard.press('Backspace');
    await cpage.keyboard.up('Control');
    return cpage.keyboard.up('A');
}
async function wait_cut(selector,cpage)
{
    await cpage.waitForSelector(selector,{delay:100}) ;
    await cpage.click(selector,{delay:100});
    await cpage.keyboard.down('Control');
    await cpage.keyboard.down('A');
    await cpage.keyboard.press('X');
    await cpage.keyboard.up('Control');
    return cpage.keyboard.up('A');
}
async function wait_paste(selector,cpage)
{
    await cpage.waitForSelector(selector,{delay:100}) ;
    await cpage.click(selector,{delay:100});
    await cpage.keyboard.down('Control');
    
    await cpage.keyboard.press('V');
    await cpage.keyboard.up('Control');
    return cpage.keyboard.up('A');
}

(async function DEMO(){

    const browser = await puppeteer.launch({headless:false}) ;
    let new_page = await browser.newPage() ;
    await new_page.goto( 'https://www.google.com' ) ;
    // await wait_type( 'input[name="q"]', "leetcode",new_page ) ;
    await wait_type_enter('input[name="q"]', "leetcode login",new_page) ;

    //now we have to click on first result
    await wait_click('a[href="https://leetcode.com/profile/account/"]',new_page);
    await wait_type( 'input[name="login"]','youusername',new_page );
    await wait_type_enter( 'input[name="password"]','yourPass',new_page );
    await new_page.waitForTimeout(4000) ;
    await wait_click('a[href="/problemset/all/"]',new_page) ;
    await new_page.waitForTimeout(4000) ;
    await wait_click('.truncate  a[href="/problems/two-sum"]',new_page);

    //prepare code in Clipboard
    await new_page.waitForTimeout(4000) ;
    await wait_click('.container__2WTi .func__1DsC button',new_page);

    await wait_clear('.ace_content .ace_layer.ace_print-margin-layer',new_page); 
    
    await wait_type('.ace_content .ace_layer.ace_print-margin-layer',""+Code,new_page);
    await wait_cut('.ace_content .ace_layer.ace_print-margin-layer',new_page);
    // cut at clipboard done now paste on code editor

    await wait_clear("pre[class=' CodeMirror-line ']",new_page);
    await wait_paste("pre[class=' CodeMirror-line ']",new_page) ;
    
    //run code
    await wait_click('button[data-cy="run-code-btn"]',new_page) ;
    await wait_click("div[class='finished__Zi5m']",new_page) ;
    // await wait_click("button[data-cy='submit-code-btn'] span[class='css-1km43m6-BtnContent e5i1odf0']",new_page);


})() ;



