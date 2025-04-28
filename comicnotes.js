function parseNotes()//Use this if you want to add individual page information/credits.
{
	var chapterNumber = place[0];
	var pageNumber = place[1];

    const pageID = (100*place[0]) + place[1]; //NOTE: IF YOU HAVE MORE THAN 100 PAGES PER CHAPTER PAGEID WON'T WORK
	var theNote = "Null";

	switch (directory)
	{
		case "Example":
			theNote = exampleNotes(pageID);
		break;

		default:
			theNote = "";
		break;
	}

	notes.innerHTML = theNote;
}

function exampleNotes(id)
{
	switch(id)
    {
		case 0:
			return "This is the first page. This text can be modified to change for specific pages.";
		break;

		case 1:
		case 4:
		case 101:
		case 200:
			return "This page has specific text assigned to it.";
		break;

		case 202:
			return "This is the last page. Clicking \"Newest\" links to this page.<br>Alternatively you could have \"Newest\" link to the first page of the newest chapter.";
		break;

		default:
			return "Default text. This page doesn't have specific text assigned to it.";
		break;
    }
}
