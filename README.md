# Spawner
## The ultimate app which can create any backend app

---

## Running the app online
Go to your favourite browser and visit [The Spawner](https://the-spawner.herokuapp.com/)  
- Enter your app name, email, slug(this should be unique), and password
- Click on add a new model 
- Enter the model name(lowercase preferably) and select if you want JWT and Passport Auth in your app. If isAuth is set to True, then you must provide an attribute with the name password
- Click on Add Attribute to give your model some attribute(or property)
- Enter the attribute name, type, required status and Attribute Ref(if you want to connect this attribute to a model)
    - If type is ObjectId, then Attribute Ref must be provided
    - If type is Array, then it is considered to be an array of ObjectIds (if ref is given), otherwise as an array of Strings
- Enter as many attributes and models as you like
- Click on Save to generate your backend application
- Please wait for a couple of seconds for Download button to appear on the top right
- Now you can download your zipped app and enjoy the full fledged backend application

---

## Running the app locally
Go to your favourite terminal and run the following commands
<pre>
git clone https://github.com/duttrohan0302/spawner
cd spawner

// To install the dependencies
npm install && npm run client-install

</pre>

### Create a .env file in the root folder
<pre>
MONGOURI=&lt;Your MongoDB URI&gt;
</pre>

### To run the web app, run the following command in a terminal
<pre>
npm run dev
</pre>

### Using React UI locally
Now you can go to http://localhost:3000 to create your backend application. Follow the same instruction as using the app online
> Apart from downloading the app using the download button, locally you can also get your backend app in the apps directory in the root folder. You can also get the zipped backend app in the client/public/zips directory. Just look for your slug.

---


### Using the backend api to create the app (POSTMAN)

#### <u>Body Options</u>
You must send an object in the POST request having the following properties
> Terminology and conditions for `JSON object`-
> - schema is an array containing the details of your models,each object is one unique model
> - attributes is an array of all the attributes in this model, if `isAuth` is `true`, password must be there as one of the attributes 
> - If type for an attribute is `ObjectId`, `ref` must be given
> - If type is `Array` and `ref` is not given, attribute will be an `array` of `Strings`, and if `ref` is given, then an `array` of `ObjectId`

<pre>
{
    "name":&lt;name of your app&gt;,
    "email": &lt;your email&gt;,
    "slug": &lt;app-slug(no spaces)&gt;,
    "password": &lt;your password&gt;,
    "schema":[{
        "name":&lt;model-name&gt;,
        "isAuth": true if you have passwords in this model, provides JWT Auth and bycrptJS encryption),
        "attributes":[
            {
                "name":&lt;attribute-name&gt;,
                "required":&lt;is attribute compulsory or not&gt;,
                "type":&lt;One out of 'String','Number','Date','Buffer','Boolean','Mixed','ObjectId','Array'&gt;,
                "ref":&lt;If this particular attribute is linked to some model, give that model's name&gt;
            }
        ]
    }]
}
</pre>

Fire up the postman app and send a POST request to the url with the following `JSON Object` as the body(raw)
Url can be https://the-spawner.herokuapp.com/app (if you want to use the online api) or http://localhost/app (if you want to use your local api, make sure you have cloned the project and it is running correctly)

```
E.g. of JSON object
{
    "name": "appName",
    "email": "appEmail@gmail.com",
    "slug": "appslug",
    "password": "123456",
    "schema": [
        {
            "name": "user",
            "isAuth": true,
            "attributes": [
                {
                    "name": "email",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "password",
                    "type": "String",
                    "required": true
                }
            ]
        },
        {
            "name": "state",
            "attributes": [
                {
                    "name": "name",
                    "type": "String",
                    "required": true
                }
            ]
        },
        {
            "name": "district",
            "attributes": [
                {
                    "name": "name",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "state_id",
                    "type": "ObjectId",
                    "required": false,
                    "ref": "state"
                }
            ]
        }
    ]
}
```
> Once you get a successful response, if you used the online api, go to https://the-spawner.herokuapp.com/zips/your-app-slug.zip to download the zipped backend folder.
>
> If you used the local end point, go to the root project folder and get your folder from `/apps/` or the zipped file from `/client/public/zips/`. Look for a folder/zipped file with your slug name.

### Add Postman collections

## Author 
### Rohan Dutt