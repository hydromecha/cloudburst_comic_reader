const examplePageNames =
[
    [
        "Example Cover",
        "Pg One",
        "0010",
        null,
        "PAGE IV"
    ],
    [

    ],
    [

    ]
];

const tutorialPageNames =
[
    [

    ],

    [
        "1. Creating Files/Folders",
        "2. Add Comic Info to comics.js",
        "2. Add Comic Info to comics.js (cont.)",
        "3. Add Page Names (If Needed)",
        "4. Add Page Notes (If Needed)"
    ],

    [

    ],
];


function pageNameHandler(pageNumber)
{
    var name = null;
    var chapterNumber = place[0] + chapterOffset;
    if(pageOption == 2)
    {
        switch(directory)
    {
        case "Welcome":
            name = "to The Cloudburst Comic Reader!";
        break;

        case "Tutorial":
            pageNumber -= pageOffset;
            chapterNumber -= chapterOffset;
            name = tutorialPageNames[chapterNumber][pageNumber];
        break;

        case "Example":
            //NOTE: If you want to use an array for page names (like in the below example) you will need to subtract pageOffset from pageNumber and chapterOffset from chapterNumber
            pageNumber -= pageOffset;
            chapterNumber -= chapterOffset;
            name = examplePageNames[chapterNumber][pageNumber];
        break;
    }
    if (name != null) return name;
    else return 0;
    }

    else
    {
        return 0;
    }

    return 0;
}
