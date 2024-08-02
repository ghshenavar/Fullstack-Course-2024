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
  
  module.exports = {
    dummy,
    totalLikes,
  }