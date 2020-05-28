# amberjs
A simple Node.js module for pulling Amber alerts

### Example

In this example we will ```console.log()``` the circumstance of the most recent, the first alert, in KY.
```js
const amberjs = require('amberjs');

amberjs.GetAlerts('KY').then((res) => {
    if(res[0]){
        amberjs.GetDetails(res[0].amberId).then((res) => {
            console.log(res.circumstances);
        })
    } else {
        console.log("Good news!  No active alerts.");
    }
});

```

## Docs

Amberjs has two functions, ```GetAlerts()``` and ```GetDetails()```.

<ins>Remember the Amber Alert API returns an object with an amberId of 0 when it cannon find the query on GetDetails().</ins>
<ins>An invalid state tag on GetAlerts() will return an empty array just like a state with no active alerts.</ins>

```GetAlerts()``` returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that when fulfilled returns an array of alert objects.  ```GetAlerts()``` can take an input two-letter state code.  For example: ```GetAlerts("KY")```

Alert objects follow this schema:

```js
{
    amberId: 99999,
    personId: 99999,
    firstName: 'First',
    midName: 'Middle',
    lastName: 'Last',
    state: 'FL',
    city: 'Miami',
    issuedFor: 'FL',
    imageUrl: '',
    alertDate: 'Jan 29, 2020 12:00:00 AM'
}
```

```GetDetails(amberId)``` returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that when fulfilled returns on object containing the details of an alert.  It requires an amberId input.

Details objects follow this schema:

```js
{
  amberId: 99999,
  isPreview: false,
  lastSeenState: 'FL',
  lastSeenCity: 'Miami',
  timeZone: '',
  lastSeenDate: 'Jan 28, 2020 12:00:00 AM',
  orgName: '',
  circumstances: 'UPDATE AMBER ALERT: The suspect has been found deceased but the child is still missing. UPDATE AMBER ALERT: The vehicle information and tag number has been updated.  A Florida AMBER Alert has been issued for First Last, last seen in the area of the 21900 block of Southwest 187th Avenue in Miami.The child may be in the company of First Last Sr. They may be traveling in a white Ford Passenger Van, FL tag number NOTR3AL. If located, DO NOT APPROACH. Contact law enforcement immediately. #FLAMBER.',
  contactOrg: 'Miami-Dade Police Department',
  contactPhone: '305-471-2400',
  personList: [
    {
      amberId: 0,
      personId: 99999,
      personType: 'MissingChild',
      firstName: 'First',
      middleName: 'Middle',
      lastName: 'Last',
      suffix: '',
      monikerName: '',
      gender: 'Male',
      eyeColor: 'Black',
      hairColor: 'Bald',
      skinColor: 'White-Hispanic',
      height: `0'20"`,
      weight: '7 lbs',
      pictureFormat: '',
      imageUrl: 'https://amberimages.ncmec.org/99999/p60939.jpg',
      externalPictureImageHeight: 0,
      externalPictureImageWidth: 0,
      pictureDescription: '',
      description: '',
      age: '1 week',
      newPerson: 1,
      hasPicture: true,
      fullName: 'First Last'
    },
    {
      amberId: 0,
      personId: 55555,
      personType: 'SuspectPerson',
      firstName: 'First',
      middleName: 'Middle',
      lastName: 'Last',
      suffix: 'Sr(or Sr. I do not know)',
      monikerName: '',
      gender: 'Male',
      eyeColor: 'Brown',
      hairColor: 'Black',
      skinColor: 'White-Hispanic',
      height: `5'7"`,
      weight: '240 lbs',
      pictureFormat: '',
      imageUrl: 'https://amberimages.ncmec.org/99999/p60940.jpg',
      externalPictureImageHeight: 0,
      externalPictureImageWidth: 0,
      pictureDescription: '',
      description: '',
      age: '49 years',
      newPerson: 1,
      vehicleList:[
          {
            vehicleId:5555,
            personId:0,
            amberId:0,
            make:"GMC",
            model:"Yukon",
            modelYear:"",
            style:"SUV",
            colorPrimary:"Maroon",
            colorSecondary:"",
            colorInterior:"",
            licensePlateText:"",
            licensePlateState:"",
            vehicleDescription:"Unknown license plate.",
            newVehicle:0
        }
    ]
      hasPicture: true,
      fullName: 'First Last'
    }
  ],
  vehicleList: [],
  targetList: [ 'Florida: Statewide' ],
  messageList: [],
  missingFrom: 'Miami, FL',
  missingDate: '01/28/2020 12:00 AM '
}
```

Keep in mind for both of these the format of the string information is fairly inconsistent.  For example, age occasionally includes the words "years" or "months".
