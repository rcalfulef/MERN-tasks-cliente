import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitProyecto = (e) => {
    e.preventDefault();

    if(nombre.trim() === '') {
      mostrarError();
      return;
    }

    agregarProyecto(proyecto)
    setProyecto({
      nombre: ''
    })

  };

  return (
    <Fragment>
      <button 
        type="button" 
        className="btn btn-primario btn-block"
        onClick={mostrarFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            name="nombre"
            placeholder="Nombre Proyecto"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

        {errorformulario 
        ? <p className='mensaje error'>El nombre es obligatorio</p>
        : null
        }


    </Fragment>
  );
};

export default NuevoProyecto;
