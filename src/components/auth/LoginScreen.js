import React from 'react';


export const LoginScreen = () => {
    return (
        <div className="container login-container">
            <h1 className='title-2'>Calendar app</h1>
            <p>Bienvenidos a Calendar, aplicación realizada con <span className="badge bg-dark">React</span> y <span className="badge bg-dark">Redux</span>.</p>
            <hr />
            <div className="tabbed">
		<input type="radio" id="tab21" name="css-tabs2" defaultChecked  />
		<input type="radio" id="tab22" name="css-tabs2" />
		
		<ul className="tabs">
			<li className="tab"><label htmlFor="tab21">Ingreso</label></li>
			<li className="tab"><label htmlFor="tab22">Registro</label></li>
		</ul>
		
		<div className="tab-content">
                <div className="login-form-1">
                    <form>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btn btn-primary btn-block"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
		</div>
		
		<div className="tab-content">
                <div className="login-form-2">
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btn btn-primary btn-block" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
		</div>
		
		
	</div>
	



            <div className="row">
                

                
            </div>
        </div>
    )
}