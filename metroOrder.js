
let MetroOrder = function(){
    let _correctRedLine = [
        'Shady Grove',
        'Rockville',
        'Twinbrook',
        'White Flint',
        'Grosvenor-Strathmore',
        'Medical Center',
        'Bethesda',
        'Friendship Heights',
        'Tenleytown-AU',
        'Van Ness-UDC',
        'Cleveland Park',
        'Woodley Park-Zoo/Adams Morgan',
        'Dupont Circle',
        'Farragut North',
        'Metro Center',
        'Gallery Pl-Chinatown',
        'Judiciary Square',
        'Union Station',
        'NoMa-Gallaudet U',
        'Rhode Island Ave-Brentwood',
        'Brookland-CUA',
        'Fort Totten',
        'Takoma',
        'Silver Spring',
        'Forest Glen',
        'Wheaton',
        'Glenmont'
    ],
    _correctGreenLine = [
        'Greenbelt', 
        'College Park-U of Md', 
        "Prince George's Plaza",
        'West Hyattsville',           
        'Fort Totten',        
        'Georgia Ave-Petworth', 
        'Columbia Heights', 
        'U Street/African-Amer Civil War Memorial/Cardozo', 
        'Shaw-Howard U',         
        'Mt Vernon Sq 7th St-Convention Center', 
        'Gallery Pl-Chinatown', 
        'Archives-Navy Memorial-Penn Quarter', 
        "L'Enfant Plaza", 
        'Waterfront', 
        'Navy Yard-Ballpark',
        'Anacostia', 
        'Congress Heights', 
        'Southern Avenue', 
        'Naylor Road', 
        'Suitland', 
        'Branch Ave'         
    ],
    _correctBlueLine = [
        'Franconia-Springfield',
        'Van Dorn Street',
        'King St-Old Town', 
        'Braddock Road', 
        'Ronald Reagan Washington National Airport', 
        'Crystal City',
        'Pentagon City',
        'Pentagon', 
        'Arlington Cemetery',
        'Rosslyn', 
        'Foggy Bottom-GWU', 
        'Farragut West', 
        'McPherson Square',
        'Metro Center', 
        'Federal Triangle', 
        'Smithsonian', 
        "L'Enfant Plaza", 
        'Federal Center SW', 
        'Capitol South', 
        'Eastern Market',
        'Potomac Ave', 
        'Stadium-Armory', 
        'Benning Road', 
        'Capitol Heights', 
        'Addison Road-Seat Pleasant', 
        'Morgan Boulevard', 
        'Largo Town Center'
    ],
    _correctOrangeLine = [
        'Vienna/Fairfax-GMU',
        'Dunn Loring-Merrifield',
        'West Falls Church-VT/UVA', 
        'East Falls Church', 
        'Ballston-MU',        
        'Virginia Square-GMU', 
        'Clarendon',
        'Court House', 
        'Rosslyn', 
        'Foggy Bottom-GWU', 
        'Farragut West', 
        'McPherson Square',
        'Metro Center', 
        'Federal Triangle', 
        'Smithsonian', 
        "L'Enfant Plaza", 
        'Federal Center SW', 
        'Capitol South', 
        'Eastern Market',
        'Potomac Ave', 
        'Stadium-Armory', 
        'Minnesota Ave',
        'Deanwood',
        'Cheverly',
        'Landover',
        'New Carrollton'
    ],
    _correctSilverLine = [
        'Wiehle-Reston East', 
        'Spring Hill',       
        'Greensboro', 
        'Tysons Corner', 
        'McLean', 
        'East Falls Church', 
        'Ballston-MU',        
        'Virginia Square-GMU', 
        'Clarendon',
        'Court House', 
        'Rosslyn', 
        'Foggy Bottom-GWU', 
        'Farragut West', 
        'McPherson Square',
        'Metro Center', 
        'Federal Triangle', 
        'Smithsonian', 
        "L'Enfant Plaza", 
        'Federal Center SW', 
        'Capitol South', 
        'Eastern Market',
        'Potomac Ave', 
        'Stadium-Armory', 
        'Benning Road', 
        'Capitol Heights', 
        'Addison Road-Seat Pleasant', 
        'Morgan Boulevard', 
        'Largo Town Center'
    ],
    _correctYellowLine = [
        'Huntington',
        'Eisenhower Avenue', 
        'King St-Old Town', 
        'Braddock Road', 
        'Ronald Reagan Washington National Airport', 
        'Crystal City',
        'Pentagon City',
        'Pentagon', 
        "L'Enfant Plaza", 
        'Archives-Navy Memorial-Penn Quarter',
        'Gallery Pl-Chinatown', 
        'Mt Vernon Sq 7th St-Convention Center', 
        'Shaw-Howard U',
        'U Street/African-Amer Civil War Memorial/Cardozo', 
        'Columbia Heights', 
        'Georgia Ave-Petworth', 
        'Fort Totten' 
    ];
       
    let orderInTheCourt = (data, metroLine) => {
        let correctValues, newOrder = [];
        if (metroLine === 'RD'){
            correctValues = _correctRedLine;
        } else if (metroLine === 'GR') {
            correctValues = _correctGreenLine;
        } else if (metroLine === 'BL') {
            correctValues = _correctBlueLine;
        } else if (metroLine === 'OR') {
            correctValues = _correctOrangeLine;
        } else if (metroLine === 'SV') {
            correctValues = _correctSilverLine;
        } else if (metroLine === 'YL') {
            correctValues = _correctYellowLine;
        }

        correctValues.forEach(element => {
            let latLngValue = data.get(element);
            newOrder.push(latLngValue);
        })    
        return newOrder;
    }

    return {
        orderMetroStations: orderInTheCourt
    };
}();