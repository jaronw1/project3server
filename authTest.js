// const jwt = require('jsonwebtoken')

// const jwtTest = () => {
//     try {
//         // when a user is logged in, we create a token
//         // signing up for the app
//         // logging in to the app

//         // create a payload of user data
//         const payload = {
//             name: 'Weston',
//             id: '2345;lkfg90aw35r2qfas',
//             email: 'w@b',
//             isAdmin: false,
//             // DO NOT PUT THE USER's PASSWORD
//         }
//         // we need to have a secret to sign the jwt with
//         const secret = 'I ate candy for breakfast'
//         const token = jwt.sign(payload, secret)

//         // signature = hashFunction({ payload information } + secret)
//         // when verifying a request, we decode and verify in the same step
//         const decode = jwt.verify(
//             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2VzdG9uIiwiaWQiOiIyMzQ1O2xrZmc5MGF3MzVyMnFmYXMiLCJlbWFpbCI6IndAYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MzA1Mjg0MX0.8wl1ArNM-WPhKf5Jg8O7stNQLNT_4gbX_m2qsibcL1I',
//             secret
//         )
//         console.log(decode)

//         console.log(token)
//     } catch (err) {
//         // a problem with a token will land us down here in the catch
//         console.log(err)
//     }
// }

// jwtTest()

const db = require('./models')

const postCrud = async () => {
    try {
        const foundUser = await db.User.findOne({_id: "6452c66fbae680280d9450cb"})
        const newPost = db.Post({
            isReview: true,
            postTitle:"This Game sucks!",
            postBody: "trueeeee!",
            taggedGame: 1,
            rating: 0,
            imageUrl: "",
            comments: [{
                content: "bruh",
                username: ""
            }],
            poster: foundUser._id
        })
        foundUser.posts.push(newPost)
        await newPost.save()
        await foundUser.save()
    } catch (error) {
        console.log(error)
    }
}
postCrud()

