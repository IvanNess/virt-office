// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const firebase = require('firebase')

export default async (req, res) => {

  const testRef = firebase.functions().httpsCallable('test')
  try {
      const resp = await testRef({data: 'aaa'})
      console.log('resp', resp)
  } catch (error) {
    console.log('error', error)
  }  
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
