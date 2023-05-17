export const UsersInfo = ({ published, total }: { published: number; total: number }) => (
  <div className="p-4 text-xl">
    <span className="inline-flex items-center gap-1 py-2 px-3 rd b-1 b-solid">
      <i className="i-lucide-users" />
      <samp className="text-base">
        {published}/{total}
      </samp>
    </span>
  </div>
);
