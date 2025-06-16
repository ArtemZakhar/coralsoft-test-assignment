import Link from 'next/link';

const EditButton = ({ path }: { path: string }) => {
  return (
    <Link href={path} className="btn btn-secondary">
      Edit
    </Link>
  );
};

export default EditButton;
