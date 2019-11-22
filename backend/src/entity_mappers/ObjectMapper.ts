export interface ObjectMapper<Object, ObjectDTO> {

    toDTO(object: Object) : ObjectDTO;

}
