using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Covialgt.Helpers
{
    public class ActionCellConstants
    {
        public const string PeriodoRegistroDatosActionCell = @"
                <a href=' / Ejecucion / Multimedia' class='action-icon hover-green' data-toggle='popover' data-trigger='hover' 
                    data-content='Multimedia' data-placement='top'>
                    <i class='fas fa-photo-video fa-lg fa-fw'></i>
                </a>
                <a href = '../Ejecucion/RegistroClimatico?plan={0}&proyecto={1}&periodo={2}' class='action-icon hover-blue' data-toggle='popover' data-trigger='hover' 
                    data-content='Clima durante el periodo' data-placement='top'>
                    <i class='fas fa-cloud fa-lg fa-fw'></i>
                </a>
                <a href = '../Ejecucion/EquipoDurantePeriodo?plan={0}&proyecto={1}&periodo={2}' class='action-icon hover-black' data-toggle='popover' data-trigger='hover' 
                    data-content='Uso de equipo en el periodo' data-placement='top'>
                    <i class='fas fa-wrench fa-lg fa-fw'></i>
                </a>
                <a href = '#' class='action-icon hover-yellow' data-toggle='popover' data-trigger='hover' 
                    data-content='Cantidades ejecutadas en el periodo' data-placement='top'>
                    <i class='fas fa-file-alt fa-lg fa-fw'></i>
                </a>
                <a href = '/Ejecucion/RegistroActividadesProyecto' class='action-icon hover-purple' data-toggle='popover' data-trigger='hover' 
                    data-content='Actividades en el proyecto' data-placement='top'>
                    <i class='far fa-calendar-check fa-lg fa-fw'></i>
                </a>
            ";

        public const string PeriodoRegistroDatosCheckCell = @"
            <div class='custom-control custom-checkbox'>
                <input type = 'checkbox' class='custom-control-input' id='chk-{0}' value='{1}' disabled>
                <label class='custom-control-label' for='chk-{0}'></label>
            </div>
        ";
    }
}