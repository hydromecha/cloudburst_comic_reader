/*
	Cloudburst Comic Reader by Hydromecha V1.6
 */


var chapters = [];

//chapter, page
var place = [0,0];

//A lot of these variables have dummy values that will be overwritten when comics are loaded
var newest = [0,1];//The Newest button will bring you to this spot

var first = [0, 0];//The First button will bring you to this spot

var comicStart = [0,0];//The first page of the comic

var comicEnd = [0,0];//The last page of the comic

var opening = [0,0];//The page you land on when you click on the comic

var preview = [0,0];//The page displayed on the comic button

var pages = [[[]]];//This will be used as a 3d array of Images, they get preloaded by the browser whenever they're initiated as new Images.

var format = '.webp';

var chapterOffset = 1;

var pageOffset = 0;

var pageOption = 1;

var directory = 'Example';

//First and last pages of the chapter currently loaded
var lastPage = 0;
var firstPage = 0;

//These variables control whether or not the Back/First or the Next/Newest buttons should be grayed out and unclickable
var backGray = 0;
var nextGray = 0;

//These variables act as a double-check to make sure buttons stay highlighted between page turns
var backGlow = 0;
var nextGlow = 0;

const pageMenu = document.getElementById("pageMenu");
const chapterMenu = document.getElementById("chapterMenu");
const comicMenu = document.getElementById("comicMenu");
const page = document.getElementById("page");
const leftSide = document.getElementById("leftSide");
const rightSide = document.getElementById("rightSide");
const buttonFirst = document.getElementById("buttonFirst");
const buttonBack = document.getElementById("buttonBack");
const buttonNext = document.getElementById("buttonNext");
const buttonNewest = document.getElementById("buttonNewest");
const logo = document.getElementById("logo");
const notes = document.getElementById("notes");
const desc = document.getElementById("desc");
const pageTitle = document.getElementById("pageTitle");
const comicButtons = document.getElementById("comicButtons");
const chapterButtons = document.getElementById("chapterButtons");

var comicLoaded = 0;//Used to keep track of the comic currently loaded, based on its position within the comics array


window.addEventListener("keyup", function(event)//turns the page left/right for left/right arrow keys
{
  	switch(event.code)
  	{
 	case "ArrowLeft":
		placeTurn(0);
	break;
 	case "ArrowRight":
		placeTurn(1);
	break;
  	}		
}, true);		

function placeTurn(way)//Handles the various ways the page can be turned
{
	var toTop = 1;
	switch(way)
	{
	case 0://Back
		if (!backGray) place[1]--;
		else toTop = 0;
	break;

	case 1://Next
		if (!nextGray) place[1]++;
		else toTop = 0;
	break;

	case 2://First
	if (!backGray)
		{
			chapterSwitch(first[0],1);
			place = first.slice();
		}
		else toTop = 0;
	break;

	case 3://Newest
		if (!nextGray)
		{
			if (newest[0] != place[0]) chapterSwitch(newest[0],1);
			place = newest.slice();
		}
		else toTop = 0;
	break;

	case 4://Page dropdown
		place[1] = pageMenu.selectedIndex + pageOffset;
	break;

	case 5://Chapter dropdown
		chapterSwitch(chapterMenu.selectedIndex, 1);
	break;
	}
	if ((place[1] > lastPage) && place[0] > comicEnd[0]) place[1] = lastPage;//if there isn't anything after the last page, stay at the last page
	else if (place[1] > lastPage) chapterSwitch(place[0]+1, 1);//if there is something past the last page, go to the next chapter
	if ((place[1] < firstPage) && place[0] < comicStart[0]) place[1] = firstPage;//if there isn't anything before the first page, stay at the first page
	else if (place[1] < firstPage) chapterSwitch(place[0]-1, 0);//if there is something before the first page, go to the previous chapter
	if (toTop)
	{
		pageSwitch();
		window.scrollTo(0, 0);//go back to the top
	}
}

function chapterSwitch(theChapter, direction)//Handles what page you land on when you change chapters & resets the page dropdown. If you're going forwards (or using the dropdown) it'll set the page to the first page. If you're going backwards, it'll set it to the last.
{
	place[0] = theChapter;
	lastPage = chapters[theChapter].last;
	firstPage = chapters[theChapter].first;
	pageOffset = firstPage;
	if (direction) place[1] = chapters[theChapter].first;
	else place[1] = chapters[theChapter].last;
	for(var i = pageMenu.length -1; i >= 0; i--)//Clears the page dropdown
	{
		pageMenu.remove(i);
	}

	dropDownPg(theChapter);
	window.scrollTo(0, 0);
}

function pageSwitch()//Handles switching and preloading pages
{
		ch = place[0] + chapterOffset;
		pg = place[1];
		page.src = 'loading.gif';//throw a loading gif onto the page for now

		//makes sure the needed array stuff isn't undefined
		if (pages[comicLoaded] == undefined) pages[comicLoaded] = [[[]]];
		if (pages[comicLoaded][ch] == undefined) pages[comicLoaded][ch] = [[[]]];
		if (pages[comicLoaded][ch][pg] == undefined) pages[comicLoaded][ch][pg] = [[[]]];
		if (pages[comicLoaded][ch][pg+1] == undefined) pages[comicLoaded][ch][pg+1] = [[[]]];
		if (pages[comicLoaded][ch][pg-1] == undefined) pages[comicLoaded][ch][pg-1] = [[[]]];
		if ((pages[comicLoaded][ch+1] == undefined) && chapters[ch+1]!=undefined && (ch+1) <= comicEnd[0]) pages[comicLoaded][ch+1] = [[[]]];
		if ((pages[comicLoaded][ch-1] == undefined) && chapters[ch-1]!=undefined && (ch-1) >= comicStart[0]) pages[comicLoaded][ch-1] = [[[]]];

		//if the current page doesn't exist, load it
		if (pages[comicLoaded][ch][pg].src == undefined && pg <= lastPage)
		{
			pages[comicLoaded][ch][pg] = new Image;
			pages[comicLoaded][ch][pg].src = directory + '/' + ch + '/'+ pg + format;
		}
		//This if/else if handles preloading the next page
		if (pages[comicLoaded][ch][pg + 1].src == undefined && pg + 1 <= lastPage)//if the next page hasn't been preloaded yet and it's still part of the current chapter
		{
			//console.log("preloaded chapter " + (ch) +", page " + (pg+1));
			pages[comicLoaded][ch][pg + 1] = new Image;
			pages[comicLoaded][ch][pg + 1].src = directory + '/' + ch + '/' + (pg + 1) + format;
		}
		else if ((pg + 1 > lastPage) && (chapters[ch + 1] <= comicEnd[0]) && (pages[comicLoaded][ch + 1][chapters[ch + 1].first] == undefined))//if the next page goes beyond the last page of the current chapter, the next chapter exists, and the first page of the next chapter hasn't been preloaded yet
		{
			nextFirst = chapters[ch+1].first;
			//console.log("preloaded chapter " + (ch+1) +", page " + nextFirst);
			pages[comicLoaded][ch+1][nextFirst] = new Image;
			pages[comicLoaded][ch+1][nextFirst].src = directory + '/' + (ch+1) + '/' + nextFirst + format;
		}

		//This if/else if handles preloading the previous page
		if (pages[comicLoaded][ch][pg - 1].src == undefined && pg - 1 >= firstPage)//if the previous page hasn't been preloaded yet and it's still part of the current chapter
		{
			//console.log("preloaded chapter " + (ch) +", page " + (pg-1));
			pages[comicLoaded][ch][pg - 1] = new Image;
			pages[comicLoaded][ch][pg - 1].src = directory + '/' + ch + '/' + (pg - 1) + format;
		}
		else if ((pg - 1 < firstPage) && chapters[ch - 1] >= comicStart[0] && (pages[comicLoaded][ch-1][chapters[ch-1].last] == undefined))//if the previous page goes beyond the first page of the current chapter, the previous chapter exists, and the last page of the previous chapter hasn't been preloaded yet'
		{
			prevLast = chapters[ch-1].last;
			//console.log("preloaded chapter " + (ch-1) +", page " + prevLast);
			pages[comicLoaded][ch-1][prevLast] = new Image;
			pages[comicLoaded][ch-1][prevLast].src = directory + '/' + (ch-1) + '/' + prevLast + format;
		}


		pages[comicLoaded][ch][pg].onload = page.src = pages[comicLoaded][ch][pg].src;//set the image on the page to be the current page's image once it loads
		parseNotes();
		pageMenu.selectedIndex = place[1] - pageOffset;
		chapterMenu.selectedIndex = place[0];

		buttonRefresh();

		//Handles the page transition animation
		page.classList.remove("unsee");
		void page.offsetWidth;
        page.classList.add("unsee");

		window.location.hash = ("#" + directory + "#" + chOffsetParse(parseInt(place[0]), 1) + "#" + place[1]);

}  

function buttonRefresh()//manages graying out/reseting the Back/Next/First/Newest buttons
{
		backGray = 0;
		nextGray = 0;
		if (place[0] <= comicStart[0] && place[1] <= comicStart[1] && place[0] >= comicEnd[0] && place[1] >= comicEnd[1])//if there's only one page in the entire comic gray everything out
		{
			backGray = 1;
			nextGray = 1;
			grayOut(0);
			grayOut(2);
		}
		else if (place[0] <= comicStart[0] && place[1] <= comicStart[1])
		{
			backGray = 1;
			grayOut(0);
			grayOut(3);
		}
		else if (place[0] >= comicEnd[0] && place[1] >= comicEnd[1])
		{
			nextGray = 1;
			grayOut(1);
			grayOut(2);
		}
		else
		{
			grayOut(1);
			grayOut(3);
		}
		glowCheck();
}

function grayOut(id)//changes the sources and classes of the buttons/page sides to gray out the buttons and change the cursors as needed
{
	switch (id)
	{
		case 0://gray out left buttons
			buttonBack.src = 'buttonBack1.png';
			buttonBack.classList.remove("left");
			buttonBack.classList.add("noClick");
			buttonFirst.src = 'buttonFirst1.png';
			buttonFirst.classList.remove("otherButton");
			buttonFirst.classList.add("noClick");
			leftSide.classList.remove("left");
			leftSide.classList.add("noClick");
		break;

		case 1://reset left buttons
			buttonBack.src = 'buttonBack.png';
			buttonFirst.src = 'buttonFirst.png';
			buttonBack.classList.add("left");
			buttonBack.classList.remove("noClick");
			buttonFirst.classList.add("otherButton");
			buttonFirst.classList.remove("noClick");
			leftSide.classList.add("left");
			leftSide.classList.remove("noClick");
		break;

		case 2://gray out right buttons
			buttonNext.src = 'buttonNext1.png';
			buttonNext.classList.remove("right");
			buttonNext.classList.add("noClick");
			buttonNewest.src = 'buttonNewest1.png';
			buttonNewest.classList.remove("otherButton");
			buttonNewest.classList.add("noClick");
			rightSide.classList.remove("right");
			rightSide.classList.add("noClick");
		break;

		case 3://reset right buttons
			buttonNext.src = 'buttonNext.png';
			buttonNewest.src = 'buttonNewest.png';
			buttonNext.classList.add("right");
			buttonNext.classList.remove("noClick");
			buttonNewest.classList.add("otherButton");
			buttonNewest.classList.remove("noClick");
			rightSide.classList.add("right");
			rightSide.classList.remove("noClick");
		break;
	}
}

function glowCheck()//Makes sure buttons stay highlighted after page turns
{
	if (backGlow && !backGray) buttonBack.src = 'buttonBack0.png';
	if (nextGlow && !nextGray) buttonNext.src = 'buttonNext0.png';
}

function buttonHover(id)//Changes the button images, used to make them highlighted or not.
{
	switch(id)
	{
		case 0:
			backGlow = 0;
			if (!backGray) buttonBack.src = 'buttonBack.png';
		break;
		case 1:
			backGlow = 1;
			if (!backGray) buttonBack.src = 'buttonBack0.png';
		break;
		case 2:
			nextGlow = 0;
			if (!nextGray) buttonNext.src = 'buttonNext.png';
		break;
		case 3:
			nextGlow = 1;
			if (!nextGray) buttonNext.src = 'buttonNext0.png';
		break;
		case 4:
			if (!backGray) buttonFirst.src = 'buttonFirst.png';
		break;
		case 5:
			if (!backGray) buttonFirst.src = 'buttonFirst0.png';
		break;
		case 6:
			if (!nextGray) buttonNewest.src = 'buttonNewest.png';
		break;
		case 7:
			if (!nextGray) buttonNewest.src = 'buttonNewest0.png';
		break;
		case 99:
			logo.src = 'SITE_TITLE_DARK.png';
		break;
		case 100:
			logo.src = 'SITE_TITLE.png';
		break;
	}				
} 

function dropDownPgFill(theChapter, hasCover)
{
	if(hasCover) pageMenu.innerHTML += ("<option value =" + chapters[theChapter].first + ">Cover</option>");
	for (var i = chapters[theChapter].first + hasCover; i <= chapters[theChapter].last; i++)
	{
		pageMenu.innerHTML += ("<option value =" + i + ">" + "Page " + i + "</option>");
	}
}

function dropDownPg(theChapter)//populates the page dropdown
{

	if (!pageOption) dropDownPgFill(theChapter, 0);//pageOption 0
	else
	{
		if (!pageNameHandler(pageOffset) && !chapters[theChapter].first) dropDownPgFill(theChapter, 1);//pageOption 1 or pageOption 2 if no custom names are found for the chapter
		else if (pageNameHandler(pageOffset))//pageOption 2
		{

			for (var i = chapters[theChapter].first; i <= chapters[theChapter].last; i++)
			{
				if (!pageNameHandler(i)) pageMenu.innerHTML += ("<option value =" + (i + pageOffset) + ">" + "Page " + i + "</option>");
				else pageMenu.innerHTML += ("<option value =" + i + ">" + pageNameHandler(i) + "</option>");
			}
		}
		else dropDownPgFill(theChapter, 0);
	}
}

function dropDownCh()//populates the dropdown menu with all the chapter names
{
  	for (var i = 0; i < chapters.length; i++)
  	{
		chapterMenu.innerHTML += ("<option value =" + i + ">" + chapters[i].title + "</option>");
  	}
}

function dropDownComic()
{
	for (var i = 0; i < comics.length; i++)
	{
		comicMenu.innerHTML += ("<option value =" + i + ">" + comics[i].title + "</option>");
	}
}

function changeComic(id)//handles changing the comic
{
	if (id < 0) comicLoaded = parseInt(comicMenu.selectedIndex); //Relevant for changing the comic with the dropdown menu or when loading from other pages
	else comicLoaded = id; //Relevant for changing the comic with the comic buttons
	pageTitle.innerHTML = (comics[comicLoaded].title + " | " + websiteTitle);
	desc.innerHTML = (comics[comicLoaded].desc);
	directory = comics[comicLoaded].directory;
	chapters = comics[comicLoaded].chapters.slice();
	newest = comics[comicLoaded].newest.slice();
	first = comics[comicLoaded].first.slice();

	chapterOffset = first[0];

	pageOption = comics[comicLoaded].pageOption;
	newest[0] -= chapterOffset;
	first[0] -= chapterOffset;

	comicStart[0] = 0;
	comicStart[1] = chapters[0].first;

	comicEnd[0] = chapters.length - 1;
	comicEnd[1] = chapters[comicEnd[0]].last;

	opening = comics[comicLoaded].opening;
	preview = comics[comicLoaded].preview;
	format = comics[comicLoaded].format;

	for(var i = chapterMenu.length -1; i >= 0; i--)//Clears the chapter dropdown
	{
		chapterMenu.remove(i);
	}

	dropDownCh();
	place = comics[comicLoaded].opening.slice();
	place[0] -= chapterOffset;
	chapterSwitch(place[0], 1);
	pageSwitch();
	makeChapterButtons();
	comicMenu.selectedIndex = comicLoaded;
}

function readHash()
{
    var hash = document.location.hash.substring(1);

    if(hash == '')
    {
		chapterOffset = defStart[1];
        hash = defStart[0] + "#" + defStart[1] + "#" + defStart[2];
        window.location.hash = "#" + hash;
    }

    const splitHash = hash.split('#');

	hash = splitHash[0];

	var hashFound = false;

	for (i = 0; i < comics.length; i++)//check through the comics array to see if the directory matches what's in the hash
	{
		if (comics[i].directory === hash)
		{
			comicMenu.selectedIndex = i;
			hashFound = true;
			break;
		}
	}

	if (!hashFound)//if the weren't any matches set the comic to the default start
	{
		for (i = 0; i <= comics.length; i++)//have to find the comic that matches the default start's directory
		{
			if (comics[i].directory === defStart[0])
			{
				comicMenu.selectedIndex = i;
				break;
			}
		}
	}

	changeComic(-1);

	if (splitHash.length == 2 || splitHash.length == 3)//parse the rest of the hash if it has the relevant parts in it
	{
		const ch = chOffsetParse(splitHash[1], 0);
		var pg;
		if (splitHash.length == 2) pg = chapters[ch].first;
		else pg = splitHash[2];

		if (legalPage(ch,pg))//Make sure the page you want to go to is legal before going there
		{
			if(ch != place[0]) chapterSwitch(ch, 1);//Change the chapter if you aren't on the right one already

			place[1] = pg;
			pageSwitch();
		}
	}

}

//Add or subtract the chapter offset from the given value. 1 for add, 0 for subtract.
function chOffsetParse(ch, id)
{
	if (!id) id = -1;
	return parseInt(ch) + chapterOffset * id;//why the FUCK do I need to put a parseInt around ch?????
}

function legalPage(ch, pg)//returns true if the inputted page isn't out of bounds
{
	if(isNaN(ch) || isNaN(pg)) return false;
	//console.log("First Ch: " + comicStart[0] + "\nLast Ch: " + comicEnd[0] + "\nFirst Page This Ch: " + firstPage + "\nLast Page This Ch: " + lastPage);
	if(ch > comicEnd[0] || ch < comicStart[0] || pg > lastPage || pg < firstPage) return false;
	else return true;
}

function makeComicButtons()//Generates the comic buttons. Uses whatever the starting page is set to as the cover.
{
	for(i = 0; i < comics.length; i++)
	{
		if(comics[i].blurb != null) comicButtons.innerHTML += "<a onClick=\"changeComic(" + i + ")\"><div class=\"outerartbox\"><img src=\"" + comics[i].directory + "/" + comics[i].preview[0] + "/" + comics[i].preview[1] + "" + comics[i].format + "\" class=\"artbox\"><h3>" + comics[i].title + "</h3><span class=\"tooltip\">" + comics[i].blurb + "</span></div></a>";

		else comicButtons.innerHTML += "<a onClick=\"changeComic(" + i + ")\"><div class=\"outerartbox\"><img src=\"" + comics[i].directory + "/" + comics[i].preview[0] + "/" + comics[i].preview[1] + "" + comics[i].format + "\" class=\"artbox\"><h3>" + comics[i].title + "</h3></div></a>";
	}
}

function makeChapterButtons()//Clears and then generates the chapter buttons
{
	chapterButtons.innerHTML = "";
	for(i = 0; i < chapters.length; i++)
	{
		if(chapters[i].blurb != null) chapterButtons.innerHTML += "<a onClick=\"chapterButton(" + i + ")\"><div class=\"outerartbox\"><img src=\"" + directory + "/" + (i + chapterOffset) + "/" + chapters[i].first + format + "\" class=\"artbox\"><h3>" + chapters[i].title + "</h3><span class=\"tooltip\">" + chapters[i].blurb + "</span></div></a>";

		else chapterButtons.innerHTML += "<a onClick=\"chapterButton(" + i + ")\"><div class=\"outerartbox\"><img src=\"" + directory + "/" + (i + chapterOffset) + "/" + chapters[i].first + format + "\" class=\"artbox\"><h3>" + chapters[i].title + "</h3></div></a>";
	}
}

function chapterButton(id)//hacky way to get the chapter buttons to work
{
	chapterMenu.selectedIndex = id;
	placeTurn(5);
}

function startReader()
{
	dropDownComic();
	readHash();
	makeComicButtons();
}

startReader();
