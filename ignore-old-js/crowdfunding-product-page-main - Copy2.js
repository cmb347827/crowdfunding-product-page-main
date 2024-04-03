'use strict'; 

const colors ={
	'Almost White': 'hsl(0, 0%, 98%)',
	'Lighter Gray': 'hsl(11, 2%, 95%)',
	'Overlay': 'hsla(3, 14%, 2%, 0.2)',
};

const data={
	navbar: document.getElementById('navbarCollapse'),
    openNav: document.querySelector('#open'),
	main:document.querySelector('#main'),
	donateAmounts: [25,75,200],
	donateWithZeroAmounts:['0','25','75','200'],
	addDonateAmounts: document.querySelectorAll('.js-donate-amount'),
	addDonateWithZeroAmounts: document.querySelectorAll('.js-donate-amount-0'),
	toggleInputs:document.querySelectorAll('.toggle'),


	outerElement:document.querySelector('.js-pop-up'),
	selectRewardBtns : document.querySelectorAll('.js-pop-up-btn'),
	pledgeReward:document.querySelectorAll('.js-pledge-reward'),
	closeBackProject:document.querySelectorAll('.js-closeBackProject'),
	successMessage: document.querySelector('.js-pop-up-success'),
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
	//show/close the menu 
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
	//on opened menu , add background color to cover main
	(data.openNav).addEventListener('click',()=>{
		addRemoveClass(data.main,'addOpacity');
	});
}

function enableDisableBtns(el,which){
	//enable /disable buttons
	if(which==='disable'){
		el.forEach((btn)=>{
		   btn.disabled=true;
		});
	}else{
		el.forEach((btn)=>{
		   btn.disabled=false;
		});
	}
}
function enableInStockInputs(emptyPledges,noncollapsedInputs,collapsedInputs){
	(collapsedInputs).forEach((toggle)=>{
        toggle.disabled=false;
		$('input').removeAttr('checked');
	});
	(noncollapsedInputs).forEach((toggle)=>{
        toggle.disabled=false;
		$('input').removeAttr('checked');
	});
	(noncollapsedInputs).forEach((input,index)=>{
		//the non-collapsable input of the popped up 'back this project'
		if(index===0){
		   //do nothing : is First js-pledge-reward input value=0, has no span with pledges left.
		}else{
			emptyPledges.forEach((pledgeIndex,indexInner)=>{
				//++pledgeIndex as the numbering should be for the js-pledge-reward inputs: value=0  is index 0 (skip this), value=25 index=1 etc.
				if(index===(++pledgeIndex)){
					//the 'out of stock' pledge.
					//disable the js-pledge-reward input
					input.disabled=true;
					$('input').removeAttr('checked');
					//also disable the accompanying collapsable toggle class input
					(collapsedInputs).forEach((toggle,indexToggle)=>{
						if(indexToggle=== pledgeIndex){
						   toggle.disabled= true;
						   $('toggle').removeAttr('checked');
						}
					});
					//and disable the accompanying js-closeBackProject 'continue' button.
					//btn.disabled=true; done on line 142.
				}else{
					input.disabled=false;
				}
			});
		}               
	});
}

function handlebackProject(){
	data.selectRewardBtns.forEach((btn)=>{
	    btn.addEventListener('click',(event)=>{
			//adds a grayish background behind the popped up modal.
			addRemoveClass(data.main,'addOpacity');
			//pops up the 'back this project' popup
			addRemoveClass(data.outerElement,'show-for-all-screens');
			//.js-pop-up-btn (selectRewardBtns) should be disabled when the 'outerElement' pops up.
            //no this here?
			//why once true needed?
            //disable all the 'Select Reward' and 'Back this project' : js-pop-up-btn buttons when the 'back this project' popup is visible
			enableDisableBtns(data.selectRewardBtns,'disable');
	    });
    });
	//closes the 'back this project' popup
	data.closeBackProject.forEach((btn)=>{
	    btn.addEventListener('click',(event)=>{
			//The below two lines of code will enable all js-pledge-reward inputs after they were disabled (in display()) , but not those who are 'out of stock'.
			const emptyPledges= getOutofstockpledges();
		    enableInStockInputs(emptyPledges,data.pledgeReward,data.toggleInputs);

			//hide the 'back this project' popup again
			addRemoveClass(data.outerElement,'show-for-all-screens');
			//pop up a success message
			handleSuccess();
	    });
    });
	//also closes the 'back this project' popup with the black x
	(data.closeModal).addEventListener('click',()=>{
		addRemoveClass(data.outerElement,'show-for-all-screens');
		addRemoveClass(data.main,'addOpacity');
	});

}
function handleSuccess(){
	//show success message 
	addRemoveClass(data.successMessage,'show-for-all-screens');
	//close success message
	data.closeSuccess.addEventListener('click',(event)=>{
		//.js-pop-up-btn (selectRewardBtns) should be enabled again when the 'successMessage' is closed : were disabled in handlebackProject()
		enableDisableBtns(data.selectRewardBtns,'enable');
		//But the next two lines disables the 'out of stock' ones.
		const outofstockPledges =getOutofstockpledges();
		setButtonTextDisabled(outofstockPledges);

		addRemoveClass(data.successMessage,'show-for-all-screens');
		//remove grayed out background behind 'success' visible popup
		addRemoveClass(data.main,'addOpacity'); 
	}, {once : true});
}

function addRemoveClass(el,classToAdd){
	if($(el).hasClass(classToAdd)){
		$(el).removeClass(classToAdd);
	}else{
		$(el).addClass(classToAdd);
	}
}

function dataProgress(){
	//the progress bar: amount raised in percentage from the total.
	const raised = Number((data.raised).textContent.replace(',',''));
	const total = Number((data.total).textContent.replace(',',''));
	let progressWidth=raised/total *100;

    $(data.progress).css('width',`${progressWidth}%`);
}

//change to update text/disabled only 3rd.
function setButtonTextDisabled(resultArray){
	(data.selectRewardBtns).forEach((btn,indexOuter)=>{
		resultArray.forEach((pledgeindex,index)=>{
			//pledgeindex + 1 , so the topmost 'select reward' button (next to the bookmark) isn't included.
			if(indexOuter===pledgeindex+1){
				btn.textContent= 'Out of stock';
				btn.disabled=true;
			}else {
				btn.textContent = 'Select Reward';
				btn.disabled=false;
			}
		});
	});
}

//change to updateleft only 1st.
function updateLeft(amount){
	if(amount===data.donateAmounts[0]){
		(data.bamboo_left).forEach((leftSpan,index)=>{
			let pledgesLeft= Number(leftSpan.textContent);
			leftSpan.textContent=--pledgesLeft;
		});
	} 
	if(amount===data.donateAmounts[1]){
		(data.black_left).forEach((leftSpan,index)=>{
			let pledgesLeft= Number(leftSpan.textContent);
			leftSpan.textContent=--pledgesLeft;
		});
	} 
	if(amount === data.donateAmounts[2]){
		(data.mahogany_left).forEach((leftSpan,index)=>{
			let pledgesLeft= Number(leftSpan.textContent);
			leftSpan.textContent=--pledgesLeft;
		});
	} 
}

//change to gets outofstock pledges only. 2nd.
function getOutofstockpledges(){
	const pledges = [data.bamboo_left,data.black_left,data.mahogany_left];
	const resultArr=[];
    pledges.forEach((pledgeItem,indexPledge)=>{
		let pledgesLeft= Number(pledgeItem[0].textContent);
        if(pledgesLeft===0){
			resultArr.push(indexPledge);
		}
	});
	return resultArr;
}

function display(){
   //display the correct buttons text/disables and correct input disables.
   const indexArray =getOutofstockpledges();
   setButtonTextDisabled(indexArray);
   enableInStockInputs(indexArray,data.pledgeReward,data.toggleInputs);
   
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
		    //remove checked status, so user could later pledge more pledges.
		    $('input').removeAttr('checked');
		    //check if 'enter your pledge' toggle button is clicked example id='pledge-0-checked', it means the value of the pledge can then be added to the 'raised' amount + number of backers increased by 1
			indexInput=index;
	   });
   });
   data.toggleInputs.forEach((toggle,index)=>{

		//toggle button is clicked
		toggle.addEventListener('click',(event)=>{
			
			$('toggle').removeAttr('checked');
			//disable all js-pledge-reward inputs
			data.pledgeReward.forEach((inputtoDisable,index)=>{
				inputtoDisable.disabled=true;
			});
			//disable the pressed toggle button so the user cant double/triple click. Enabled again in enableInStockInputs().Called line 130.
			toggle.disabled=true;
			//remove checked status, so user could pledge more pledges.
			
			//console.log('indexinput ',indexInput,' index ',index);
			if((indexInput===index) ){
				//console.log('in loop indexinput ',indexInput,' index ',index);
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
	const startDate = new Date('March 26, 2024 01:12:00');
	//calculate end date : the date 56 days from startDate
    const startDatePlus56Days = startDate.addDays(56);
	//calculate the number of days in between the end date and the current date (now), and display it as 'days left'.
	const now = new Date();
	let Difference_In_Time = startDatePlus56Days.getTime() - now.getTime();
    let Difference_In_Days =Math.round(Difference_In_Time / (1000 * 3600 * 24));
	(data.days).textContent= Difference_In_Days;

}
function loadDonations(){
	//loads the amounts that can be donated [25-200]
	(data.addDonateAmounts).forEach((element,index)=>{
		element.textContent = (data.donateAmounts)[index];
    });
	//loads the amounts that can be donated [0-200]
    (data.addDonateWithZeroAmounts).forEach((element,index)=>{
        element.textContent = (data.donateWithZeroAmounts)[index];
	});
}
$(window).on('load',function(){
   loadDonations();
   handlebackProject();
   display();
   handleNavBar();
   
});