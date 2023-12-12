import api from '../plugins/api'

class AutorService {
  async getAllAutores() {
    const response = await api.get('/autores/')
    return response.data
  }
  async saveAutor(autor) {
    let response
    if (autor.id) {
      response = await api.put(`/autores/${autor.id}/`, autor)
    } else {
      response = await api.post('/autores/', autor)
    }
    return response.data
  }
  async deleteAutor(autor) {
    const response = await api.delete(`/autores/${autor.id}/`)
    return response.data
  }
}

export default new AutorService()