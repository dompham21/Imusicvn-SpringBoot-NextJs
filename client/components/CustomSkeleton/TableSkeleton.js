import { Box, Skeleton, Grid, SkeletonText } from '@chakra-ui/react'

import { Table } from 'antd';

const { Column } = Table;


const TableSkeleton = () => {
    const  makeColumn = (n) => {
        let columns = new Array(n);
        for (let i = 0; i < n; ++i) {
          console.log(i);
          columns[i] = i;
        }
        return columns;
      }
    const coloumns = makeColumn(10);
    return (
        <Box p='0 24px 24px 24px'>
             <Table
                dataSource={coloumns}
                pagination={false}
            >
                <Column title="ID" dataIndex="id" key="id" className="col-name"
                    sorter={(a, b) => a.id - b.id}
                    showSorterTooltip={false}
                    width={70}
                />
                <Column title="Photo" dataIndex="photo" key="photo" 
                    width={100}
                />
                <Column title="Artist Name" dataIndex="name" key="name" ellipsis={true}
                    width={200}
                    sorter={(a, b) => a.name.localeCompare(b.name)}
                    showSorterTooltip={false}
                />
                <Column title="Introduction" dataIndex="introduction" key="introduction" ellipsis={true}/>
                <Column title="Status" dataIndex="enabled" key="enabled" className="col-tag"
                    width={100}
                    align={'center'}
                    filters={
                        [
                            {
                              text: 'Active',
                              value: true,
                            },
                            {
                              text: 'Banned',
                              value: false,
                            },
                          ]
                    }
                    onFilter={(value, record) => record.enabled === value}

                />
                <Column title="Action" dataIndex="action" key="action" className="col-action flex flex-ai-c"
                    width={150}
                />
            </Table>
        </Box>
    )
}

export default TableSkeleton;