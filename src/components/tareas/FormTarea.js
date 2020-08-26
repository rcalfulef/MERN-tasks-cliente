import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  // extraer proyectos desde el initial state
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { 
    tareaseleccionada,
    errortarea, 
    agregarTarea, 
    validarTarea, 
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  
  } = tareasContext;

  useEffect(() => {
    if(tareaseleccionada !== null) {
      setTarea(tareaseleccionada)
    } else {
      setTarea({nombre: ''})
    }
  }, [tareaseleccionada])

  const [tarea, setTarea] = useState({
    nombre: ''
  })

  const {nombre} = tarea;

  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const handleChange = e => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if(nombre.trim() === ''){
      validarTarea();
      return;
    }
    
    if(tareaseleccionada === null) {
      //agregar nueva tarea al state
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      limpiarTarea()
    }
    
    obtenerTareas(proyectoActual._id);
    setTarea({
      nombre: ''
    })
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
            />
        </div>
      </form>

      {errortarea
        ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null
      }
    </div>
  );
};

export default FormTarea;