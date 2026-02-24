-- Add role column, migrate from buyer/seller, then drop old columns
ALTER TABLE users ADD COLUMN role VARCHAR(100);

UPDATE users
SET role = CASE
    WHEN seller = TRUE THEN 'SELLER'
    ELSE 'BUYER'
END;

ALTER TABLE users ALTER COLUMN role SET NOT NULL;

ALTER TABLE users DROP COLUMN buyer;
ALTER TABLE users DROP COLUMN seller;
