const dummy = () => {
    return 1
  }


const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item
	}

	const blogsLikes = blogs.map(blogs => blogs.likes)
  
	return blogsLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const blogsLikes = blogs.map(blogs => blogs.likes)
    const mostLikes = blogsLikes.indexOf(Math.max(...blogsLikes))
	const favorite = blogs[mostLikes]

	return favorite ? {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	} : {}
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }