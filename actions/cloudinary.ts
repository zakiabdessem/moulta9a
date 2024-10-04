import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: 'dlua23dqn',
  api_key: '289241747476532',
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
})

export const uploadImage = async (base64: string) => {
  const { secure_url } = await cloudinary.v2.uploader.upload(base64)
  return secure_url
}
