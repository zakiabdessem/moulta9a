import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: 'dlua23dqn',
  api_key: '289241747476532',
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
})

export const uploadImage = async (base64: any) => {
  console.log("🚀 ~ uploadImage ~ base64:", base64)
  try {
    
    const { secure_url } = await cloudinary.v2.uploader.upload_url(base64)

    return secure_url
  } catch (error) {
    console.error('🚀 ~ uploadImage ~ error:', error)
  }
}
