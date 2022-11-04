const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const {
    async
} = require('@firebase/util');
const {
    query
} = require('express');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = new express();
// app.use(express.json());
//för att komma åt url: 
app.use(express.urlencoded({
    extended: "true"
}))

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send('Hej från webbisserveris')
});

//GET hamsters
app.get('/hamsters', async (req, res) => {
    try {
        const listItem = [];
        const query = await db.collection('hamsters').get();

        query.forEach(doc => {
            listItem.push({
                id: doc.id,
                ...doc.data()
            })
        })
        res.json({
            list: listItem
        })
        console.log(hamsters);
    } catch (err) {
        console.error(err);
    }
})

//Get random hamster 2st (så det inte blir samma bild mot varandra i frontend)
app.get('/hamsters/random', async (req, res) => {
    try {
        const hamstersArray = []
        const query = await db.collection('hamsters').get();
        query.forEach(doc => {
            hamstersArray.push({
                id: doc.id,
                ...doc.data()
            })
        })
        console.log(hamstersArray);

        let randomHamsterOneId = Math.floor(Math.random() * hamstersArray.length);
        let randomHamsterOne = hamstersArray[randomHamsterOneId]

        hamstersArray.splice(randomHamsterOneId, 1)

        let randomHamsterTwo = hamstersArray[Math.floor(Math.random() * hamstersArray.length)]
        let randomHamsters = [randomHamsterOne, randomHamsterTwo]
        res.json({
            list: randomHamsters
        })
    } catch (err) {
        console.error(err);
    }
})

//GET hamsters id 
app.get('/hamsters/:id', async (req, res) => {
    try {
        const list = [];
        const {
            id
        } = req.body;
        const query = await db.collection('hamsters').get()
        query.forEach(doc => {
            list.push({
                id: doc.id,
                ...doc.data()
            })
        })
        console.log(list);
        res.json({
            id: id
        })
    } catch (err) {
        console.error(err);
    }
});

//PUT ett objekt med ändringar 

app.put('/hamsters/:id', async (req, res) => {
    const {
        id,
        wins,
        games
    } = req.body;

    try {
        const ref = await db.collection('hamsters').doc(id);
        ref.update({
            wins,
            games
        })
        res.json({
            message: "200"
        })
    } catch (err) {
        console.error(err);
    }
})


// DELETE item

app.delete('/hamsters/:id', async (req, res) => {
    const {
        id
    } = req.body;

    try {
        const ref = db.collection('hamsters').doc(id);
        await ref.delete();
        res.json({
            message: "200"
        });
    } catch (err) {
        console.error(err);
    }
})


app.listen(1010, () => {
    console.log('servern är igång!');
})