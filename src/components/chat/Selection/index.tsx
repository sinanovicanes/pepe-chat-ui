"use client";
import { PlusIcon, SearchIcon } from "@/components/icons";
import { fetchChatrooms } from "@/utils/api";
import {
  Button,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FC, Key, useCallback, useEffect, useMemo, useState } from "react";
import { ChatSelectionActions } from "./Actions";
import { JoinNewRoomModal } from "./JoinNewRoomModal";
import columns from "./columns";

interface Props {}

const ROWS_PER_PAGE = 25;

export const ChatSelection: FC<Props> = () => {
  const { data: session, status } = useSession();

  const [chatRooms, setChatRooms] = useState<ExtendedChatRoom[]>([]);

  useEffect(() => {
    fetchChatrooms(session?.user.accessToken).then(setChatRooms);
  }, []);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending"
  });
  const [page, setPage] = useState(1);
  const joinNewRoomModal = useDisclosure();

  const pages = Math.ceil(chatRooms.length / ROWS_PER_PAGE);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = columns;

  const items = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    return chatRooms.slice(start, end);
  }, [page]);

  const renderCell = useCallback((item: ExtendedChatRoom, columnKey: Key) => {
    switch (columnKey) {
      case "activeChatters":
        return `${item.activeChatters}/${item.maxChatters}`;
      case "actions":
        return <ChatSelectionActions />;
      default:
        //@ts-ignore
        return item[columnKey];
    }
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1"
            }}
            placeholder="Search for room..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
              onPress={joinNewRoomModal.onOpen}
            >
              Join New Room
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, onSearchChange, chatRooms.length, hasSearchFilter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background"
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none"
      ]
    }),
    []
  );

  return (
    <>
      <Table
        isCompact
        className="w-8/12"
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background"
          }
        }}
        classNames={classNames}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {column => (
            <TableColumn key={column.key} align={column.align}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"You're not connected to the any chatroom"}
          items={chatRooms}
        >
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  {renderCell(item, columnKey as keyof ExtendedChatRoom)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <JoinNewRoomModal disclosure={joinNewRoomModal} />
    </>
  );
};
