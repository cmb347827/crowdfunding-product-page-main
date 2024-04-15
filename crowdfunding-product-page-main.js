'use strict'; 

const colors ={
	'Almost White': 'hsl(0, 0%, 98%)',
	'Lighter Gray': 'hsl(11, 2%, 95%)',
	'Overlay': 'hsla(3, 14%, 2%, 0.2)',
};

const data={
	navbar: document.getElementById('navbarCollapse'),
    openNav: document.querySelector('#open'),
	bookmark: document.querySelector('#bookmark'),
	buttonHTML:`empty`,

	donateAllAmounts:[0,25,75,200],
	donate0:document.querySelectorAll('.js-donate-0'),
	donate25:document.querySelectorAll('.js-donate-25'),
	donate75:document.querySelectorAll('.js-donate-75'),
	donate200:document.querySelectorAll('.js-donate-200'),

	toggleInputs:document.querySelectorAll('.toggle'),
	disabledOverlay: document.querySelectorAll('.js-disabled-overlay'),
	disabledOverlayModal:document.querySelectorAll('.js-disabled-overlay-modal'),

	first_dialog:document.querySelector('.js-first-modal'),
	selectRewardBtns : document.querySelectorAll('.js-pop-up-btn'),
	pledgeReward:document.querySelectorAll('.js-pledge-reward'),
	closeBackProject:document.querySelectorAll('.js-closeBackProject'),
	second_dialog: document.querySelector('.js-second-modal'),
	closeSuccess:document.querySelector('.js-closeSuccess'),
	closeModal: document.querySelector('.js-closeModal'),

	progress: document.querySelector('.progress-width'),
	raised:document.querySelector('#raised'),
	backers:document.querySelector('#backers'),
	days: document.querySelector('#days'),
	total:document.querySelector('#total'),
	bamboo_left:document.querySelectorAll('.bamboo-left'),
	black_left: document.querySelectorAll('.black-left'),
	mahogany_left:document.querySelectorAll('.mahogany-left'),
}

$(window).resize(function(){
	location.reload();
});

function handleNavBar(){
	//show/close the top right menu in mobile view.
	(data.navbar).addEventListener('change',()=>{
		
		this.on("show.bs.collapse", function(){
			//menu is collapsed, show close icon.
			$('#open').toggleClass('hidden');
			$('#closed').toggleClass('show');
		});
		this.on("hide.bs.collapse", function(){
			
			$('#closed').toggleClass('show');
			$('#open').toggleClass('hidden');
		});
	});
	//on opened menu , add background color to cover main ,only in mobile view.
	(data.openNav).addEventListener('click',()=>{
		//document.querySelector(".overlay").style.display = "block";
		$('.overlay').toggleClass('show');
	});
}


function disableOutStockInputs(emptyPledges,noncollapsedInputs,collapsedInputs){
	//removes 'checked' attribute from the 'toggle' inputs
	(collapsedInputs).forEach((toggle)=>{
        toggle.setAttribute('aria-disabled','false');
		toggle.removeAttribute('checked');
	});
	//removes 'checked' attribute from the 'js-pledge-reward' inputs
	(noncollapsedInputs).forEach((toggle)=>{
        toggle.setAttribute('aria-disabled','false');
		toggle.removeAttribute('checked');
	});
	(noncollapsedInputs).forEach((input,index)=>{
		//the non-collapsable input of the popped up 'back this project' modal.
		if(index===0){
		   //do nothing : is First js-pledge-reward input value=0, has no span with pledges left (pledge with no reward)
		}else{
			//will check to see if there are emptyPledges index values , and disable the accompanying div '.inner'
			emptyPledges.forEach((pledgeIndex,indexInner)=>{
				//++pledgeIndex as the numbering should be for the js-pledge-reward inputs: skip value=0, only look from value=25 index=1 etc.
				if(index===(++pledgeIndex)){
					//found the 'out of stock' pledge.
					//disable the js-pledge-reward input
					input.setAttribute('aria-disabled','true');
					input.removeAttribute('checked');
					//also disable the accompanying collapsable .toggle class input
					(collapsedInputs).forEach((toggle,indexToggle)=>{
						if(indexToggle=== pledgeIndex){
							toggle.setAttribute('aria-disabled','true');
							toggle.removeAttribute('checked');
						}
					});
				}else{
					//no 'out of stock' pledge found
					input.setAttribute('aria-disabled','false');
				}
			});
		}               
	});
}

function handlebackProject(){
	//pops up the 'back this project' popup
	data.selectRewardBtns.forEach((btn)=>{
		//first load only
		btn.setAttribute('aria-disabled','false');
		btn.addEventListener('click',(event)=>{
			const aria= btn.getAttribute('aria-disabled');
			if(aria === 'false'){
				//btn has not been disabled
				//pop up the 'back this project' popup
                (data.first_dialog).showModal();
				//loads the donation amounts in the 'back this project' popup.
				loadDonations();
			}
		});
    });
	//closes the 'back this project' popup
	data.closeBackProject.forEach((btn)=>{
	    btn.addEventListener('click',(event)=>{
			(data.first_dialog).close();
			handleSuccess();
	    });
    });
	//also closes the 'back this project' popup with the black x
	(data.closeModal).addEventListener('click',()=>{
		(data.first_dialog).close();
	});

}
function addDisabledOverlay(emptypledges){
    emptypledges.forEach((emptypledge,index)=>{
		//for each emptypledge, which is an index (index 0= bamboo etc) zie const pledges = [data.bamboo_left,data.black_left,data.mahogany_left]; getoutofstockpledges()
       (data.disabledOverlay).forEach((divTodisable,innerIndex)=>{
		   //if empty pledge is present, add overlay class to elements that have the js-disabled-overlay class added (zie html lines 86,98,110)
		   if(emptypledge===innerIndex){
			  $(divTodisable).addClass('disabled-overlay');
		   }
	   });
	   (data.disabledOverlayModal).forEach((divTodisable,innerIndex)=>{
		    //if empty pledge is present, add overlay class to elements that have the js-disabled-overlay-modal class added(zie html lines 152,180,208)
			if(emptypledge===innerIndex){
			  $(divTodisable).addClass('disabled-overlay');
			}
	    });
	});
	
}
function handleSuccess(){
	//Popups the success message modal.
	(data.second_dialog).showModal();
	//will close success message modal 
	data.closeSuccess.addEventListener('click',(event)=>{
		//Disable the 'out of stock' pledge buttons
		const outofstockPledges =getOutofstockpledges();
		setButtonTextDisabled(outofstockPledges);
        //disables out of stock inputs
		const emptyPledges= getOutofstockpledges();
		disableOutStockInputs(emptyPledges,data.pledgeReward,data.toggleInputs);

		//Make out of stock pledge areas() disabled looking by adding a sheer white overlay
		if(emptyPledges){
            addDisabledOverlay(emptyPledges);
		}
		//close success message modal
		(data.second_dialog).close();
	}, {once : true});
}

function dataProgress(){
	//the progress bar: amount raised in percentage from the total.
	const raised = Number((data.raised).textContent.replace(',',''));
	const total = Number((data.total).textContent.replace(',',''));
	let progressWidth=raised/total *100;
   
    //$(data.progress).css('width',`${progressWidth}%`);
	data.progress.value = progressWidth;
}


//resultarray: bamboo=0,black=1,mahogany=2 , 'back this project' should not be included.
//selectRewardBtns (skip index 0, is 'back this project' button, not a pledge amount 25,75, or 200).
function setButtonTextDisabled(resultArray){
	(data.selectRewardBtns).forEach((btn,indexOuter)=>{
		resultArray.forEach((pledgeindex,index)=>{
			//++pledgeindex and indexOuter>0, as pledges array is 0-2 ,so selectRewardBtns 1-3 will skip the 'back this project' button if btn is 'back this project' button
			if(indexOuter>0){ //skip 'back this project'
		        ++pledgeindex;//bamboo is now 1 instead of 0 (selectRewardBtns)
				if(indexOuter===pledgeindex){
					btn.textContent= 'Out of stock';                               
					btn.setAttribute('aria-disabled','true');
					$(btn).css('backgroundColor','lightgray');            
				}else {
					btn.textContent = 'Select Reward';
					btn.setAttribute('aria-disabled','false');
				}
			}
		});
	});
}


function updateLeft(amount){
	//updates the amount of pledges left for bamboo,black, and mahogany.
	if(amount===data.donateAllAmounts[1]){
		//amount donated is same as amount in donateAllAmounts[1] = 25
		(data.bamboo_left).forEach((leftSpan,index)=>{
			let pledgesLeft= Number(leftSpan.textContent);
			leftSpan.textContent=--pledgesLeft;
		});
	} 
	if(amount===data.donateAllAmounts[2]){
		//amount donated is same as amount in donateAllAmounts[2] = 75
		(data.black_left).forEach((leftSpan,index)=>{
			let pledgesLeft= Number(leftSpan.textContent);
			leftSpan.textContent=--pledgesLeft;
		});
	} 
	if(amount === data.donateAllAmounts[3]){
		//amount donated is same as amount in donateAllAmounts[3] = 200
		(data.mahogany_left).forEach((leftSpan,index)=>{
			let pledgesLeft= Number(leftSpan.textContent);
			leftSpan.textContent=--pledgesLeft;
		});
	} 
}


function getOutofstockpledges(){
	const pledges = [data.bamboo_left,data.black_left,data.mahogany_left];
	const resultArr=[];
    pledges.forEach((pledgeItem,indexPledge)=>{
		let pledgesLeft= Number(pledgeItem[0].textContent);
        if(pledgesLeft===0){
			//empty pledge found, add it's index (in pledges array) to the resultArr array.
			resultArr.push(indexPledge);
		}
	});
	return resultArr;
}

function display(){
   //display the correct buttons text/disables and correct input disables (from out-of-stock pledges) on load.
   const indexArray =getOutofstockpledges();
   setButtonTextDisabled(indexArray);
   disableOutStockInputs(indexArray,data.pledgeReward,data.toggleInputs);
   
   //display/update the number of days left
   updateDays();
   //display the progress bar.
   dataProgress();
   let backers =Number((data.backers).textContent.replace(',',''));
   let raised = Number((data.raised).textContent.replace(',',''));
   let indexInput='';

   data.pledgeReward.forEach((input,index)=>{
	   //below the user selected a input on the 'back this project' popup (outerElement) example id="pledge-0-selected"
	  
        input.addEventListener('click',(event)=>{
		    const aria= input.getAttribute('aria-disabled');
	        //if the button is not disabled, proceed.
		    if(aria === 'false'){
				//remove checked status, so user could later pledge more pledges.
				input.removeAttribute('checked');
				//check if 'enter your pledge' toggle button is clicked example id='pledge-0-checked', it means the value of the pledge can then be added to the 'raised' amount + number of backers increased by 1
				indexInput=index;
			}
	   });
   });
   data.toggleInputs.forEach((toggle,index)=>{

		//toggle button is clicked
		toggle.addEventListener('click',(event)=>{
            const aria= toggle.getAttribute('aria-disabled');
			//if input is not disabled, proceed.
			if(aria === 'false'){
				//remove checked status, so user could pledge more pledges after 'back this project' modal is closed and opened again.
				toggle.removeAttribute('checked');
				//but disable the pressed toggle button so the user cant double/triple click when the modal is opened, during the same opended modal. 
				//This ensures the user can only choose EACH PLEDGE ONCE every time the 'back this project' modal pops up !!! This makes sense in expected behaviour 
				//Enabled again first in disableOutStockInputs().(zie aria===false) when the 'success' modal is closed 
				toggle.setAttribute('aria-disabled','true');
				
				if((indexInput===index) ){
					//The input class='toggle' is the input below the input class=js-pledge-reward for this particular pledge.
					//so pledge is only added to total raised when the user clicks the class='toggle' input as well.
					const amount= Number((data.pledgeReward)[indexInput].value);
					raised +=amount;
					backers++;
					(data.raised).textContent= raised.toLocaleString();
					(data.backers).textContent= backers.toLocaleString();
					//update the progress bar 
					dataProgress();
					//update the number of pledges left for the selected pledge.
					updateLeft(amount);

				}
			}
		});
    });
   
}
Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function updateDays(){
	//'now' and plus 56 days is always going to be 56 days apart if the Date() constructor is empty.
	// I picked a fixed date with time (date posted on frontendmentor), otherwise it never updates.
	const startDate = new Date('April 14, 2024 01:12:00');
	//calculate end date : the date 56 days from startDate
    const startDatePlus56Days = startDate.addDays(56);
	//calculate the number of days in between the end date and the current date (now), and display it as 'days left'.
	const now = new Date();
	let Difference_In_Time = startDatePlus56Days.getTime() - now.getTime();
    let Difference_In_Days =Math.round(Difference_In_Time / (1000 * 3600 * 24));
	(data.days).textContent= Difference_In_Days;

}
function loadDonations(){
	//loads the donation amounts dynamically (see donateAllAmounts in data).This way, the amounts can be changed at a later time.
	(data.donate0).forEach((element)=>{
        element.textContent = `$${(data.donateAllAmounts)[0]}`;
	});
	(data.donate25).forEach((element)=>{
        element.textContent = `$${(data.donateAllAmounts)[1]}`;
	});
	(data.donate75).forEach((element)=>{
        element.textContent = `$${(data.donateAllAmounts)[2]}`;
	});
	(data.donate200).forEach((element)=>{
        element.textContent = `$${(data.donateAllAmounts)[3]}`;
	});
}


//The top right bookmark button's code.When it's clicked it's appearance is updated in loadButton.
(data.bookmark).addEventListener('click',() => loadButton(data));

function loadButton(data){
	//loads the correct looking bookmark button, either 'bookmark' or 'bookmarked' after the user clicks.
	const svg =`<svg  width="56" height="56" xmlns="http://www.w3.org/2000/svg"
		               aria-labelledby="button-label">
					   <title id="button-label">Bookmark</title>
					   <g fill="none" fill-rule="evenodd"><circle fill="" cx="28" cy="28" r="28"/>
					   <path fill="#B1B1B1" d="M23 19v18l5-5.058L33 37V19z"/></g>
	                </svg>`;
				
    if (data.buttonHTML===`empty`) {
        if((data.bookmark).classList.contains("bookmark-gray")===false){
           $(data.bookmark).addClass('bookmark-gray');
		} 
		(data.bookmark).innerHTML = `${svg} <span class='move-down'>Bookmark</span>`;
		data.buttonHTML=`${svg} Bookmark`;
		
	}   else if(data.buttonHTML=== `${svg} Bookmark`){
		if((data.bookmark).classList.contains("bookmark-gray")){
			$(data.bookmark).removeClass('bookmark-gray');
			$(data.bookmark).addClass('bookmark-blue');
		} 
		(data.bookmark).innerHTML =`${svg} <span class='move-down'>Bookmarked</span>`;
		data.buttonHTML=`${svg} Bookmarked`;
	} else {
		if((data.bookmark).classList.contains("bookmark-gray")===false){
			$(data.bookmark).addClass('bookmark-gray');
		} 
		if((data.bookmark).classList.contains("bookmark-blue")===true){
			$(data.bookmark).removeClass('bookmark-blue');
		} 
		(data.bookmark).innerHTML= `${svg} <span class='move-down'>Bookmark</span>`;
		data.buttonHTML=`${svg} Bookmark`;
	}
	
}
function registerDialogs(){
	//needed because of the dialog element.
   const dialogs = document.querySelectorAll('dialog');
   dialogs.forEach((dialog)=>{
	  dialogPolyfill.registerDialog(dialog);
   });
}

$(window).on('load',function(){

   loadDonations();
   loadButton(data);
   display();
   registerDialogs();
   handlebackProject();
   handleNavBar();
   
});
