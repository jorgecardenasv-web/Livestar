import { useTranslations } from 'next-intl';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { User } from "../types/user";

export const UsersList = ({
  users,
}: {
  users: User[];
}) => {
  const t = useTranslations('usersList');

  return (
    <div className="w-full">
      {users && users.length > 0 ? (
        <div className="mx-auto max-w-2xl">
          <Table>
            <TableHead className="dark:text-white">
              <TableRow>
                <TableHeaderCell>{t('name')}</TableHeaderCell>
                <TableHeaderCell>{t('email')}</TableHeaderCell>
                <TableHeaderCell>{t('role')}</TableHeaderCell>
                <TableHeaderCell>{t('createdAt')}</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{t(`roles.${user.role}`)}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleString(t('locale'))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>{t('noUsers')}</p>
      )}
    </div>
  );
};