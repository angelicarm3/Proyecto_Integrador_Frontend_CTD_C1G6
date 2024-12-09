import { FaUserShield } from 'react-icons/fa'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const ChangeAdminBtn = ({ user, onClickChangeAdmin }) => {
  return (
    <>
      <button
        className={`${user.esAdmin ? 'bg-green1' : 'bg-blue1'} 'text-black px-4 py-2 rounded text-xl cursor-pointer'`}
        onClick={() => onClickChangeAdmin()}
        data-tooltip-id='admin-tooltip'
      >
        <FaUserShield size={24} />
      </button>
      <ReactTooltip
        id='admin-tooltip'
        place='top'
        effect='float'
        content='Modificar permisos'
      />
    </>
  )
}

export default ChangeAdminBtn
