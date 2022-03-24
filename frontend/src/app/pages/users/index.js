import { CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react'
import { useState } from 'react'
import TableLoading from 'app/components/common/TableLoading'
import { fields } from './fields'

const Users = () => {
  const [create, setCreate] = useState(false)
  const [limit, setLimit] = useState(20)
  const [sort, setSort] = useState({
    column: 'email',
    asc: 'true'
  })

  // TODO: get users from database
  const data = null
  const users = data?.items.map((item, idx) => ({
    ...item,
    _classes: [
      !item.active && 'table-obsoleted',
      idx % 2 && 'striped-row'
    ]
  }))

  const isFetching = false
  const isError = false
  const isLoading = false
  const error = null

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
              loading={isFetching}
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
                  <p>TODO: edit button</p>
                ),
                activateUser: (user) => (
                  <p>TODO: activate user</p>
                )
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>

      {create
        ? <p> TODO: create user </p>
        : ''}
    </CRow>
  )
}

export default Users
