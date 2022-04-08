const express=require('express')
const needle=require('needle')
const cors=require('cors')

require('dotenv').config()
const app=express()
app.use(cors())
app.get('/', (req, res) => {
    let adminContent = `
      <div>
        You don't appear to be logged in.  You can log in by visiting
        <a href="/auth/google">the Authentication Route</a>. You could
        also look at details about yourself at <a href="/current_user">the Current User route</a>
      </div>
    `;
    if (req.user) {
      adminContent = `
        <div>
          You appear to be logged in, so you can visit <a href="/admins">the Admins route</a>
          or you can <a href="/logout">Logout</a>.
        </div>
      `;
    }
    res.send(`
      <div>
        <h4>Hi!  Welcome to the React SSR API</h4>
        <div>
          You can see <a href="/users">the Users route</a>
        </div>
        ${adminContent}
      </div>
    `);
  });
app.get('/users',async(req,res)=>{
    try {
        const apiRes = await needle('get', `https://mehrdad2003.github.io/atari/fruits.json`)
        let data = apiRes.body
    
       
    
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
    }
})
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log('server is run on poer');
})