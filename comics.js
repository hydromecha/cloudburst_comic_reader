//Default starting spot formatted as: "Directory", Chapter, Page
const defStart = ["Welcome", 0, 0];

const websiteTitle = "THE CLOUDBURST COMIC READER PLACEHOLDER NAME";

/*
 * pageOption
 * 0 - Page 0 will be listed as Page 0
 * 1 - Page 0 (if present) will be listed as Cover
 * 2 - Custom page names
 * 		NOTE: pageOption 2 will default to pageOption 1's rules if:
 * 				A chapter doesn't have any custom names
 * 				OR
 * 				A chapter doesn't have a custom name set for its first page
 * 		NOTE: If there is a name missing in a chapter with pageOption 2 (excluding the first page), the name will default to "Page #"
 */

/*
 * firstChapter
 * Set this to the number for the first chapter of the comic. This will usually be set to 1 but if you have a prologue you might want to set it to 0.
 * NOTE: You can't use negative numbers.'
 */

const comics =
[
	{
		title: "Welcome to The Cloudburst Comic Reader",
		directory: "Welcome",
		chapters:
		[
			{
				title: "Welcome",
				blurb: null,
				first: 0,
				last: 0
			},
		],
		first: [0,0],
		newest: [0,0],
		preview: [0,0],
		opening: [0,0],
		format: ".webp",
		pageOption: 2,
		desc: "An introduction to The Cloudburst Comic Reader.<br>What is it? Who is it for? What does it do?<br>These questions should be answered by the above page.",
		blurb: "An introduction to The Cloudburst Comic Reader."
	},

	{
		title: "Comic Reader Example",
		directory: "Example",
		chapters:
		[
			{
				title: "Chapter 1: The First One",
				blurb: "The first chapter in the example comic.",
				first: 0,
				last: 4
			},

			{
				title: "2nd Chapter: The Quest for More Pages",
				blurb: "Chapter 2 in the example comic.",
				first: 0,
				last: 2
			},

			{
				title: "Chapter III: This Time it Isn't Chapter 2",
				blurb: "The final chapter of the example comic.",
				first: 0,
				last: 2
			}
		],
		first: [1,0],
		newest: [3,2],
		preview: [1,0],
		opening: [1,0],
		format: ".webp",
		pageOption: 2,
		desc: "This is an example of The Cloudburst Comic Reader.<br><a href=\"https://github.com/hydromecha/cloudburst_comic_reader\">Click here to see the repo!</a><br>Current Version: 1.6",
		blurb: "An example of The Cloudburst Comic Reader."
	},

	{
		title: "Tutorial",
		directory: "Tutorial",
		chapters:
		[
			{
				title: "File Structure",
				blurb: null,
				first: 1,
				last: 2
			},
			{
				title: "Setting up Comics",
				blurb: null,
				first: 1,
				last: 5
			},

			{
				title: "Further Customizations",
				blurb: null,
				first: 1,
				last: 1
			}
		],
		first: [1,1],
		newest: [3,1],
		preview: [1,1],
		opening: [1,1],
		format: ".png",
		pageOption: 2,
		desc: "A quick tutorial on how to use The Cloudburst Comic Reader.<br>Goes over where to put your pages and how to enter info into the relevant js files.",
		blurb: "A quick tutorial on how to use The Cloudburst Comic Reader."
	},
];
