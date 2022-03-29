import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react'
import { useState } from 'react'
import TableLoading from 'app/components/common/TableLoading'
import { fields } from './fields'
import { useQuery } from 'react-query'
import Loader from 'app/components/Loader'
import { UsersListQuery } from 'api/queries'
import TableActionButtons from './shared/tableActionButtons'
import CreateUserModal from './shared/modals/createUserModal'

const Users = () => {
  const [create, setCreate] = useState(false)
  const [limit, setLimit] = useState(20)
  const [sort, setSort] = useState({
    column: 'email',
    asc: 'true'
  })

  const { isLoading, isError, error, data } = useQuery('users', UsersListQuery, {
    retry: false
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <p>error</p>
  }

  const users = data?.data?.map((item, idx) => ({
    ...item,
    _classes: [
      !item.active && 'table-obsoleted',
      idx % 2 && 'striped-row'
    ]
  }))

  const page = 1

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow className='align-items-center'>
              <CCol>
                <h3>Users</h3>
              </CCol>

              <CCol>
                <div className='card-header-actions'>
                  <CButton size='sm' color='info' onClick={() => setCreate((val) => !val)}>
                    Create User
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              loading={isLoading}
              items={users}
              striped
              fields={fields}
              itemsPerPageSelect
              itemsPerPage={limit}
              hover={!(isLoading || ((users != null) && (users.length === 0)) || isError)}
              noItemsViewSlot={isLoading &&
                <TableLoading />}
              noItemsView={isError ? { noItems: error.message } : {}}
              sorterValue={sort}
              onSorterValueChange={setSort}
              onPaginationChange={(val) => setLimit(val)}
              scopedSlots={{
                editUser: (user) => (
                  <TableActionButtons.EditUserBtn page={page} limit={limit} user={user} />
                ),
                activateUser: (user) => (
                  <TableActionButtons.ActivateUserBtn page={page} limit={limit} user={user} />
                )
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {create
        ? (<CreateUserModal
            show={!!create}
            setShow={setCreate}
            page={page}
            limit={limit}
           />)
        : ''}
    </CRow>
  )
}

export default Users
