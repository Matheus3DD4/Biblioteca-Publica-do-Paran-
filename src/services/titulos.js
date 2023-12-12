import api from '../plugins/api'

class TituloService {
  async getAllTitulos() {
    const response = await api.get('/titulos/')
    return response.data
  }
  async saveTitulo(titulo) {
    let response
    if (titulo.id) {
      response = await api.put(`/titulos/${titulo.id}/`, titulo)
    } else {
      response = await api.post('/titulos/', titulo)
    }
    return response.data
  }
  async deleteTitulo(titulo) {
    const response = await api.delete(`/titulos/${titulo.id}/`)
    return response.data
  }
}

export default new TituloService()