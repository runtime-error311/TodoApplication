export const passwordValidation = (touched,password)=>touched.password && password.length < 8
export const nameValidation = (touched,name)=> (touched.name && name.length < 3) || name.length > 100
export const titleValidation = (touched,title)=> touched.title && (title.length < 3 || title.length > 100)
export const descriptionValidation = (touched,description)=> touched.description && description.length < 3 