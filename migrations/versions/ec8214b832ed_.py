"""empty message

Revision ID: ec8214b832ed
Revises: ebef9b40474e
Create Date: 2020-12-09 10:56:31.838096

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ec8214b832ed'
down_revision = 'ebef9b40474e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('posts', 'updated_at',
               existing_type=mysql.DATETIME(),
               nullable=True)
    op.drop_column('posts', 'deteled_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('posts', sa.Column('deteled_at', mysql.DATETIME(), nullable=True))
    op.alter_column('posts', 'updated_at',
               existing_type=mysql.DATETIME(),
               nullable=False)
    # ### end Alembic commands ###
